import { AfterCreateQuestionComponent } from './after-create-question/after-create-question.component';
import { LoginRegisterModalComponent } from '../../login-register-modal/login-register-modal.component';
import { AuthService } from '../../_services/auth.service';
import { GetSeededDataService } from '../../_services/get-seeded-data.service';

import { Component, OnInit, Input } from '@angular/core';
import { DateService } from '../../_services/date.service';
import { EventService } from '../../_services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  @Input() eventType: string;

  gotData = false;
  eventDate = {} as any;
  eventTime: string;
  allEventOptions = [] as any;
  allEventOptionsDescription = [] as any;
  eventOptionsToAddId = [] as any;
  eventOptionsToAddDescription = [] as any;

  eventToAdd = {} as any;
  minDate: Date;
  constructor(
    private getSeededData: GetSeededDataService,
    private dateSerice: DateService,
    private eventService: EventService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.minDate = this.dateSerice.getTodaysDate();
    this.getSeededData.getEventOptions().subscribe(next => {
      this.allEventOptions = next;
      let index = 0;
      for (let i = 0; i < this.allEventOptions.length; i++) {
        this.eventOptionsToAddId[i] = String(this.allEventOptions[i][0].id);
        this.eventOptionsToAddDescription[i] = this.allEventOptions[i][0].description;

        for (let j = 0; j < this.allEventOptions[i].length; j++) {
          this.allEventOptionsDescription[index] = this.allEventOptions[i][j].description;
          index++;
        }
      }

      this.gotData = true;
    });
  }

  createEvent() {

    this.eventToAdd.DateTimeOfEvent = this.dateSerice.parseDateAndTime(this.eventDate, this.eventTime);
    this.eventToAdd.RSVP = this.dateSerice.parseDateAndTime(this.eventToAdd.RSVP);
    this.eventToAdd.giftsAddBy = this.dateSerice.parseDateAndTime(this.eventToAdd.giftsAddBy);
    this.eventToAdd.eventOptionsIds = this.eventOptionsToAddId;
    this.eventToAdd.eventType = this.eventType;

    if (!this.authService.loggedIn()) {
      const dialogRef = this.dialog.open(LoginRegisterModalComponent, {});

      dialogRef.afterClosed().subscribe(result => {
        const questionDialog = this.dialog.open(AfterCreateQuestionComponent, {});
        questionDialog.afterClosed().subscribe(questionResult => {
          this.eventToAdd.adminParticipates = questionResult;
          this.eventToAdd.userID = this.authService.decoded().nameid;

          this.eventService.addevent(this.eventToAdd).subscribe(next => {
            const eventAdded = JSON.parse(JSON.stringify(next));
            this.router.navigate(['/EventShowEdit/' + eventAdded.eventId]);
          });
        });

      });
    } else {

      const questionDialog = this.dialog.open(AfterCreateQuestionComponent, {});
      questionDialog.afterClosed().subscribe(questionResult => {
        this.eventToAdd.adminParticipates = questionResult;
        this.eventToAdd.userID = this.authService.decoded().nameid;
        this.eventService.addevent(this.eventToAdd).subscribe(next => {
          const eventAdded = JSON.parse(JSON.stringify(next));
          this.router.navigate(['/EventShowEdit/' + eventAdded.eventId]);
        });
      });

    }



  }

  changeDescription(allEventOptionsId, id) {
    this.eventOptionsToAddDescription[+id] = this.allEventOptionsDescription[+allEventOptionsId];
  }

}
