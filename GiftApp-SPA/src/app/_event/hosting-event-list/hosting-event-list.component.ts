import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventService } from '../../_services/event.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-hosting-event-list',
  templateUrl: './hosting-event-list.component.html',
  styleUrls: ['./hosting-event-list.component.css']
})
export class HostingEventListComponent implements OnInit {
  allEvents: any;
  modalRef: BsModalRef;
  eventToEdit = {} as any;
  index: number;


  displayedColumns: string[] = ['position', 'eventName', 'eventType', 'numberOfParticipants', 'numberOfConfirmedParticipants', 'delete'];
  dataSource = new MatTableDataSource();
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private modalService: BsModalService,
    private route: Router) {

  }

  ngOnInit() {
    this.eventService
      .getAllHostingEvents(this.authService.decoded().nameid)
      .subscribe(next => {
        this.allEvents = next;
        this.dataSource = new MatTableDataSource(this.allEvents);
        this.dataSource._updateChangeSubscription();
      }, error => {
      });
  }




  deleteEvent(event: any) {
    console.log(event);
    this.alertifyService.confirm('Are you sure you want to delete ' + event.eventName + '?', () =>
      this.eventService.deleteEvent(event.eventId).subscribe(next => {
        this.allEvents.splice(event, 1);
        this.dataSource._updateChangeSubscription();
      }, error => {
      })
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // editEvent(eventName, maxPrice, giftDeadline, eventPlace, mailingAddress, city, state, zipCode, event) {
  //   this.eventToEdit.eventId = event.eventId;
  //   this.eventToEdit.eventName = eventName;
  //   this.eventToEdit.maxPrice = maxPrice;
  //   this.eventToEdit.eventPlace = eventPlace;
  //   this.eventToEdit.giftDeadline = giftDeadline;
  //   this.eventToEdit.mailingAddress = mailingAddress;
  //   this.eventToEdit.city = city;
  //   this.eventToEdit.state = state;
  //   this.eventToEdit.zipCode = zipCode;

  //   this.eventService.editEvent(this.eventToEdit).subscribe(next => {
  //     if (next.status === 200) {
  //       this.index = this.allEvents.indexOf(event);
  //       this.allEvents[this.index].eventName = this.eventToEdit.eventName;
  //       this.allEvents[this.index].maxPrice = this.eventToEdit.maxPrice;
  //       this.allEvents[this.index].eventPlace = this.eventToEdit.eventPlace;
  //       this.allEvents[this.index].giftDeadline = this.eventToEdit.giftDeadline;
  //       this.allEvents[this.index].address.mailingAddress = this.eventToEdit.mailingAddress;
  //       this.allEvents[this.index].address.city = this.eventToEdit.city;
  //       this.allEvents[this.index].address.state = this.eventToEdit.state;
  //       this.allEvents[this.index].address.zipCode = this.eventToEdit.zipCode;

  //       this.modalRef.hide();
  //     }
  //   });
  // }


}
