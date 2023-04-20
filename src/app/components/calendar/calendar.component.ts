import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  Calendar,
  CalendarOptions,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ToolsService } from 'src/app/services/tools.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined; // Add this variable
  calendarOptions: CalendarOptions;
  calendarApi: Calendar | undefined;

  calendarEvents: EventInput[] = [
    {
      id: uuidv4(),
      title: 'Event 1',
      start: '2023-04-20T08:00:00',
      end: '2023-04-20T08:15:00',
    },
    {
      id: uuidv4(),
      title: 'Event 2',
      start: '2023-04-20T08:30:00',
      end: '2023-04-20T08:45:00',
    },
    {
      id: uuidv4(),
      title: 'Event 3',
      start: '2023-04-20T09:00:00',
      end: '2023-04-20T09:15:00',
    },
  ];
  constructor(private toolService: ToolsService) {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      events: this.calendarEvents,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: '',
      },
      slotDuration: '00:15:00',
      slotLabelInterval: '00:15:00',
      allDaySlot: false,
      dateClick: this.handleDateClick.bind(this),
      selectable: true,
      selectMirror: true,
      selectOverlap: false,
      eventOverlap: false,
      eventContent: this.displayEventContent.bind(this),
    };
  }

  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent!.getApi();
  }

  handleDateClick(arg: any) {
    console.log(console.log('Date clicked:', arg));
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent: EventInput = {
        id: uuidv4(),
        title,
        start: arg.date,
        end: this.toolService.addMinutes(arg.dateStr, 15),
        allDay: arg.allDay,
      };
      this.calendarApi!.addEvent(newEvent);
      const currentEvents: EventInput[] = this.calendarOptions
        .events as EventInput[]; // cast the events function as an array of EventInput
      this.calendarOptions.events = [...currentEvents, newEvent]; // update the events function with the new array of events
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
    const currentEvents: EventInput[] = this.calendarOptions
      .events as EventInput[];
    this.calendarOptions.events = currentEvents.filter(
      (event) => event.id !== eventId
    );
    this.calendarApi!.getEventById(eventId)!.remove();
  }

  showCalendarEvents() {
    console.log(this.calendarApi?.getEvents());
  }
  displayEventContent(eventInfo: EventContentArg) {
    {
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        console.log(eventInfo.event);
        this.deleteEvent(eventInfo.event.id);
      });
      const eventTitle = document.createElement('div');
      eventTitle.innerText = eventInfo.event.title;
      const eventTime = document.createElement('div');
      eventTime.innerText =
        this.formatEventTime(eventInfo.event.start!) +
        ' ' +
        this.formatEventTime(eventInfo.event.end!);
      const eventElement = document.createElement('div');
      eventElement.appendChild(eventTitle);
      eventElement.appendChild(eventTime);
      eventElement.appendChild(deleteButton);
      return { domNodes: [eventElement] };
    }
  }
}
