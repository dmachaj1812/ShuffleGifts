import { EventShowParticipantData } from './../../../_models/eventShowParticipantData';
import { Component, OnInit, Input } from '@angular/core';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { EventService } from 'src/app/_services/event.service';
import { Role } from 'src/app/_models/role';

@Component({
  selector: 'app-event-partcipants',
  templateUrl: './event-partcipants.component.html',
  styleUrls: ['./event-partcipants.component.css']
})
export class EventPartcipantsComponent implements OnInit {

  @Input() eventId;
  @Input() rsvp;
  Role = Role;
  loaded = false;
  role;


  eventShowPartData = {} as EventShowParticipantData;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.checkUserEventRole(this.eventId).subscribe(next => {
      this.role = next;

      this.eventShowPartData.eventId = this.eventId;
      this.eventShowPartData.rsvp = this.rsvp;

      this.loaded = true;

    });


  }

}
