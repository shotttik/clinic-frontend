import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined; // Add this variable
  constructor(private toolService: ToolsService) {}

  calendarEvents: EventInput[] = [
    {
      title: 'Event 1',
      start: '2023-04-20T08:00:00',
      end: '2023-04-20T08:15:00',
    },
    {
      title: 'Event 2',
      start: '2023-04-20T08:30:00',
      end: '2023-04-20T08:45:00',
    },
    {
      title: 'Event 3',
      start: '2023-04-20T09:00:00',
      end: '2023-04-20T09:15:00',
    },
  ];
  calendarOptions: CalendarOptions = {
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
  };

  handleDateClick(arg: any) {
    console.log(console.log('Date clicked:', arg));
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent: EventInput = {
        title,
        start: arg.date,
        end: this.toolService.addMinutes(arg.dateStr, 15),
        allDay: arg.allDay,
      };
      console.log(newEvent);
      const currentEvents: EventInput[] = this.calendarOptions
        .events as EventInput[]; // cast the events function as an array of EventInput
      this.calendarOptions.events = [...currentEvents, newEvent]; // update the events function with the new array of events
    }
  }

  ngOnInit() {}
}
