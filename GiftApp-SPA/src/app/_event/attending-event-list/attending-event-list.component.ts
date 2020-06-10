import { DateService } from 'src/app/_services/date.service';
import { MatTable } from '@angular/material/table';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/_services/event.service';
import { tokenGetter } from 'src/app/app.module';

@Component({
  selector: 'app-attending-event-list',
  templateUrl: './attending-event-list.component.html',
  styleUrls: ['./attending-event-list.component.css']
})
export class AttendingEventListComponent implements OnInit {
  displayedColumns: string[] = ["index", "eventName", "eventType", "confirm"];
  userId: number;
  myEvents = [] as any;
  userIdEventId = {} as any;
  index: number;

  dataSource = new MatTableDataSource();

  constructor(
    private eventService: EventService,
    private alertify: AlertifyService,
    private authService: AuthService,
    public dateService: DateService
  ) { }

  ngOnInit() {
    this.userId = this.authService.decoded().nameid;
    this.eventService.getAllUserEvents(this.userId).subscribe(
      next => {
        this.myEvents = next;
        this.dataSource = new MatTableDataSource(this.myEvents);
        console.log(this.myEvents);
      },
      error => {
        this.alertify.error('Problem retreving data.');
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirm(eventId: number, RSVP: object) {
    if (this.compareDates(RSVP)) {
      return;
    }

    this.userIdEventId.userId = this.userId;
    this.userIdEventId.eventId = eventId;

    console.log(this.userIdEventId);

    this.eventService.confirmUserEvent(this.userIdEventId).subscribe(next => {
      this.index = this.myEvents.indexOf(next);
      this.myEvents[this.index] = next;
    });
  }

  compareDates(RSVP) {
    return new Date(RSVP) < this.dateService.getTodaysDate();
  }


  getTooltipMessage(RSVP) {
    if (this.compareDates(RSVP)) {
      return 'You could make changes until ';
    }
    else {
      return 'You can make changes until ';
    }
  }
}
