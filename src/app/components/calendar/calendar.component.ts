import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  Input,
} from '@angular/core';
import {
  Calendar,
  CalendarOptions,
  DateSelectArg,
  DateSpanApi,
  EventClickArg,
  EventContentArg,
  FormatterInput,
  LocaleInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ToolsService } from 'src/app/services/tools.service';
import { v4 as uuidv4 } from 'uuid';
import { VerboseFormattingArg } from '@fullcalendar/core/internal';
import allLocales from '@fullcalendar/core/locales-all';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomPromptComponent } from '../dialog-popup/custom-prompt/custom-prompt.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogComponent } from '../dialog-popup/confirmation-dialog/confirmation-dialog.component';
import { Reservation } from 'src/app/models/Reservation';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  entryComponents: [CustomPromptComponent],
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined; // Add this variable
  @ViewChild(CustomPromptComponent)
  confirmPopup!: CustomPromptComponent;
  @Input() calendarEvents: EventInput[] = [];

  //calendarOptions
  calendarOptions: CalendarOptions;
  calendarApi: Calendar | undefined;
  deleteEvents: boolean = false;
  dateSelectArg!: DateSelectArg;

  //popup
  showPopup: boolean = false;
  popupTitle = '';
  popupMessage = '';

  reservationData: Reservation = new Reservation();
  private readonly user: User;

  currentPath: string | undefined;

  constructor(
    private toolService: ToolsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    this.user = this.authService.getUserData();
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,today,next',
        center: 'title',
        right: '',
      },
      buttonText: { today: 'დღეს' },

      titleFormat: { year: 'numeric', month: 'long' },
      firstDay: 1,
      allDaySlot: false,
      selectable: true,
      selectMirror: true,
      selectOverlap: false,
      //event
      selectAllow: this.handleSelectAllow.bind(this),
      select: this.handleDateSelect.bind(this),
      events: this.calendarEvents,
      eventOverlap: false,
      eventMinHeight: 70,
      eventMinWidth: 100,

      //slot
      slotDuration: '01:00',
      slotLabelInterval: '01:00',
      slotMinTime: '09:00',
      slotMaxTime: '17:00',
      slotMinWidth: 100,
      slotLabelFormat: this.slotTimeFormat.bind(this),
      eventColor: '#DAFAEE',
    };
  }

  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent!.getApi();
    this.currentPath = this.route.snapshot.routeConfig!.path;

    setTimeout(() => {
      this.calendarOptions.events = this.calendarEvents;
    }, 100);
  }

  handleDateSelect(arg: DateSelectArg) {
    if (
      !this.IsAuthenticated() ||
      arg.start.getDay() === 0 ||
      arg.start.getDay() === 6
    ) {
      // prevent default behavior of creating an event
      arg.jsEvent!.preventDefault();
      return;
    }

    if (this.isDoctorGetsRestDays() || this.isAdminUser()) {
      this.popupTitle = 'გსურთ შესვენების აღება?';
      this.popupMessage = 'მიუთითეთ შეტყობინება თქვენი მომხმარებლებისთვის';
    } else {
      this.popupTitle = 'გსურთ ვიზიტის დაჯავშნა?';
      this.popupMessage = 'მიუთითეთ თქვენი პრობლემა';
    }

    this.showPopup = true;
    this.dateSelectArg = arg;
  }

  handleSelectAllow(selectInfo: DateSpanApi) {
    var start = selectInfo.start;
    var end = selectInfo.end;
    if (!this.IsAuthenticated()) return false;

    //მხოლოდ მომხმარებელს შეუძლია დაჯავშნა დოქტორის გვერდზე და ადმინისტრატორს შეუძლია დოქტორს დაუჯავშნოს შესვენება
    if (this.currentPath?.includes('doctor') && this.isDoctorUser())
      return false;
    // მომხმარებელს თავის პროფილზე არ შეუძლია დაჯავშნა
    if (this.currentPath == 'profile' && this.isNormalUser()) return false;
    if (
      start.getDay() === 6 ||
      start.getDay() === 0 ||
      end.getDay() === 6 ||
      end.getDay() === 0
    ) {
      // Check if the selected date range includes weekends
      // Disable selection
      return false;
    } else {
      // Enable selection
      return true;
    }
  }

  formatEventTime(date: Date) {
    const timeFormat = new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return timeFormat.format(date);
  }

  deleteEvent(eventId: string) {
    console.log(eventId);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'წაშლის დასტური',
        message: 'ნამდვილად გსურთ ჯავშნის წაშლა?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        const currentEvents: EventInput[] = this.calendarOptions
          .events as EventInput[];
        this.calendarOptions.events = currentEvents.filter(
          (event) => event.id !== eventId
        );
        this.calendarApi!.getEventById(eventId)!.remove();
      }
    });
  }

  slotTimeFormat(date: VerboseFormattingArg) {
    const start = date.date.marker.toISOString().split('T')[1].substr(0, 5);
    const end = new Date(date.date.marker.getTime() + 60 * 60 * 1000)
      .toISOString()
      .split('T')[1]
      .substr(0, 5);
    return `${start} - ${end}`;
  }

  showDeleteOnEvents() {
    this.deleteEvents = !this.deleteEvents;
  }

  //dateselect accepted
  onConfirm(title: string) {
    this.showPopup = false;
    if (title == '') {
      return;
    }
    const newEvent: EventInput = {
      id: uuidv4(),
      title: title,
      start: this.dateSelectArg.start,
      end: this.dateSelectArg.end,
      allDay: this.dateSelectArg.allDay,
    };

    //filling reservation data
    this.reservationData.title = title;
    this.reservationData.start = this.dateSelectArg.start.toISOString();
    this.reservationData.end = this.dateSelectArg.end.toISOString();
    let doctorId = this.getDoctorId();
    const user = this.authService.getUserData();
    if (doctorId != 0 && !this.isAdminUser()) {
      this.reservationData.doctorId = doctorId;
      this.reservationData.userId = user.Id;
      newEvent.className = 'myEvent';
    } else if (doctorId != 0 && this.isAdminUser()) {
      //ადმინს შეუძლია შესვენების დაჯავშნა
      this.reservationData.doctorId = doctorId;
      newEvent.classNames = 'restDays';
    } else {
      //დოქტორს მხოლოდ შესვენების დაჯავშნა შეუძ₾ია საკთარ გვერდზე,
      this.reservationData.doctorId = user.Id;
      newEvent.classNames = 'restDays';
    }

    //sending api request
    this.apiService.setReservation(this.reservationData).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'წარმატეუბლი!',
          detail: 'დაიჯავშნა წარმატებით',
        });
        this.calendarApi!.addEvent(newEvent);
        const currentEvents: EventInput[] = this.calendarOptions
          .events as EventInput[]; // cast the events function as an array of EventInput
        this.calendarOptions.events = [...currentEvents, newEvent]; // update the events function with the new array of events
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'შეცდომა!',
          detail: err.error,
        });
      },
    });
  }

  onCancel() {
    this.showPopup = false;
  }

  IsAuthenticated() {
    return this.authService.isAuthenticated();
  }
  changePage(url: string) {
    this.router.navigate([url]);
  }
  getDoctorId(): number {
    const routeParams = this.route.snapshot.paramMap;
    return Number(routeParams.get('doctorId'));
  }
  isNormalUser() {
    return this.user.Role == 'მომხმარებელი' ? true : false;
  }
  isDoctorUser() {
    return this.user.Role == 'ექიმი' ? true : false;
  }
  isAdminUser() {
    return this.user.Role == 'ადმინისტრატორი' ? true : false;
  }
  isDoctorGetsRestDays() {
    return this.currentPath == 'profile' && this.isDoctorUser();
  }
}
