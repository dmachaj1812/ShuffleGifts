import { DateService } from './../_services/date.service';
import { EventShowParticipantData } from './../_models/eventShowParticipantData';
import { AlertifyService } from './../_services/alertify.service';
import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../_services/auth.service';
import { Role } from '../_models/role';
import { EventService } from '../_services/event.service';


@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.component.html',
  styleUrls: ['./view-participants.component.css']
})
export class ViewParticipantsComponent implements OnInit {

  @Input() eventShowPartData: EventShowParticipantData;
  sub: any;
  currentParticipants;
  loggedInEmail;
  role;
  minDate: Date;
  canManageParticipants;
  canAddParticipants = false;
  dataSource = new MatTableDataSource(this.currentParticipants);
  displayedColumns: string[];


  constructor(private userService: UserService,
    private dateService: DateService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private eventService: EventService) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    this.minDate = this.dateService.getTodaysDate();
    this.checkCanManageParticipants();

    this.userService.getAllParticipants(this.eventShowPartData.eventId).subscribe(next => {
      console.log(next);
      this.currentParticipants = next;
      this.dataSource = new MatTableDataSource(this.currentParticipants);
      this.dataSource._updateChangeSubscription();
    });
    this.loggedInEmail = this.authService.decoded().email;

    this.eventService.checkUserEventRole(this.eventShowPartData.eventId).subscribe(next => {
      this.role = next;

      if (this.role.name === Role.admin() || this.role.name === Role.semiAdmin()) {
        this.displayedColumns = ['position', 'name', 'email', 'giftNumber', 'isConfirmed', 'Role', 'delete'];
        this.canAddParticipants = true;
      } else {
        this.displayedColumns = ['position', 'name', 'email'];
      }
    });


  }


  delete(f) {
    this.alertify.confirm('Are you sure you want to delete ' + f.user.userName + '?', () => {
      this.userService.deleteParticipant(this.eventShowPartData.eventId, f.user.id).subscribe(next => {
        if (next.status === 200) {
          this.currentParticipants.splice(this.currentParticipants.indexOf(f), 1);
          this.dataSource._updateChangeSubscription();
        }
      });
    });


  }

  checkUserLogin(emailToCheck) {
    if (emailToCheck === this.loggedInEmail) {
      return true;
    } else {
      return false;
    }
  }


  checkCanManageParticipants() {
    const rsvpDate = new Date(Date.parse(this.eventShowPartData.rsvp));
    if (this.minDate > rsvpDate) {
      this.canManageParticipants = false;
    }
  }
}

