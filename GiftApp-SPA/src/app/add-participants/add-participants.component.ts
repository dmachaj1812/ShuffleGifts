import { AlertifyService } from './../_services/alertify.service';
import { MatTableDataSource } from "@angular/material";
import { UserService } from "./../_services/user.service";
import { Component, OnInit, OnDestroy, Input, Directive } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Location } from '@angular/common';





@Component({
  selector: "app-add-participants",
  templateUrl: "./add-participants.component.html",
  styleUrls: ["./add-participants.component.css"]
})
export class AddParticipantsComponent implements OnInit, OnDestroy {


  isDataLoaded = false;
  oneClick = false;
  sub: any;
  emailSub: any;
  emailExists = true;
  eventId: number;
  emailList = [] as any;
  eventName: string;
  participants = {} as any;
  displayedColumns: string[] = ['no.', 'name', 'email', 'semiAdmin', 'delete' ];
  participantsToAdd = [];
  participantsToSend: ParticipantsToSend;

  dataSource = new MatTableDataSource(this.participantsToAdd);


  constructor(private userService: UserService,
                                private route: ActivatedRoute,
                                private router: Router,
                                private aletrify: AlertifyService,
                                private location: Location) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = +params['eventId'];
    });
    this.emailSub = this.userService.getEmails(this.eventId).subscribe(next => {
      this.emailList = next;
      console.log(this.emailList);
      this.isDataLoaded = true;
    }, error => {
      this.aletrify.error('Problem with retreving emails');
    });
  }
  deleteParticipant(participant) {
    this.participantsToAdd.splice(this.participantsToAdd.indexOf(participant), 1);
    this.dataSource._updateChangeSubscription();
  }
  addToList(f) {
    if (!f.value.semiAdmin) {
      f.value.semiAdmin = false;
    }
    this.participantsToAdd.push(f.value);
    this.dataSource._updateChangeSubscription();
    f.reset();
  }

  toggleSemiAdmin(participant) {
    const index = this.participantsToAdd.indexOf(participant);
    this.participantsToAdd[index].semiAdmin = !this.participantsToAdd[index].semiAdmin;
    this.dataSource._updateChangeSubscription();
  }
   addAllToEvent() {
    this.oneClick = true;
    this.participantsToSend = {
      eventId: this.eventId,
      participants: this.participantsToAdd
    };

    this.userService.addParticipants(this.participantsToSend).subscribe(next => {
    this.location.back();
    }, error => {
      this.aletrify.error('Database error, please try agian.');
      this.oneClick = false;
    });

  }


    ngOnDestroy() {
      this.sub.unsubscribe();
    }
}


export interface ParticipantToAdd {
  name: string;
  email: string;
  semiAdmin: boolean;
}

export interface ParticipantsToSend {
  eventId: number;
  participants: ParticipantToAdd[];
}

