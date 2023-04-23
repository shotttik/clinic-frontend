import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ComponentFactoryResolver,
  ViewContainerRef,
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

  calendarOptions: CalendarOptions;
  calendarApi: Calendar | undefined;
  deleteEvents: boolean = false;
  dateSelectArg!: DateSelectArg;

  //popup
  showPopup: boolean = false;
  popupMessage = '';

  calendarEvents: EventInput[] = [
    {
      id: uuidv4(),
      title: 'Event 1',
      start: '2023-04-20T09:00:00',
      end: '2023-04-20T10::00',
    },
    {
      id: uuidv4(),
      title: 'Event 2',
      start: '2023-04-20T10:00:00',
      end: '2023-04-20T11:00:00',
    },
    {
      id: uuidv4(),
      title: 'Event 3',
      start: '2023-04-20T11:00:00',
      end: '2023-04-20T12:00:00',
    },
  ];

  constructor(
    private toolService: ToolsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
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
      // dateClick: this.handleDateClick.bind(this),
      select: this.handleDateClick.bind(this),
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

      // eventContent: this.displayEventContent.bind(this),
    };
  }

  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent!.getApi();
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);

    const title = prompt('Please enter a new title for your evenat');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: uuidv4(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }
  handleDateClick(arg: DateSelectArg) {
    if (
      !this.IsAuthenticated() ||
      arg.start.getDay() === 0 ||
      arg.start.getDay() === 6
    ) {
      // prevent default behavior of creating an event
      arg.jsEvent!.preventDefault();
      return;
    }

    this.popupMessage = 'Please enter the title of the event';
    this.showPopup = true;
    this.dateSelectArg = arg;
  }

  handleSelectAllow(selectInfo: DateSpanApi) {
    var start = selectInfo.start;
    var end = selectInfo.end;

    if (!this.IsAuthenticated()) return false;

    // Check if the selected date range includes weekends
    if (
      start.getDay() === 6 ||
      start.getDay() === 0 ||
      end.getDay() === 6 ||
      end.getDay() === 0
    ) {
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

  showCalendarEvents() {
    console.log(this.calendarApi?.getEvents());
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
  onConfirm(title: string) {
    this.showPopup = false;
    if (title != '') {
      const newEvent: EventInput = {
        id: uuidv4(),
        title,
        start: this.dateSelectArg.start,
        end: this.dateSelectArg.end,
        allDay: this.dateSelectArg.allDay,
      };
      this.calendarApi!.addEvent(newEvent);
      const currentEvents: EventInput[] = this.calendarOptions
        .events as EventInput[]; // cast the events function as an array of EventInput
      this.calendarOptions.events = [...currentEvents, newEvent]; // update the events function with the new array of events
    }
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
}
