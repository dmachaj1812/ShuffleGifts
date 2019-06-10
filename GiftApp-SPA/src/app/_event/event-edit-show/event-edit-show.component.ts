import { EventShowParticipantData } from '../../_models/eventShowParticipantData';
import { DateService } from 'src/app/_services/date.service';
import { GetSeededDataService } from '../../_services/get-seeded-data.service';
import { AlertifyService } from '../../_services/alertify.service';
import { EventService } from '../../_services/event.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { computeStyle } from '@angular/animations/browser/src/util';



@Component({
  selector: 'app-event-edit-show',
  templateUrl: './event-edit-show.component.html',
  styleUrls: ['./event-edit-show.component.css']
})
export class EventEditShowComponent implements OnInit {
  currentEvent = {} as any;
  eventToSendToDB = {} as any;
  eventId: number;
  minDate: Date;
  giftsShuffled = false;
  canChangeRSVP = true;
  eventLoaded = false;
  allEventOptions = [] as any;
  allEventOptionsDescription = [] as any;
  eventOptionsToAddId = [] as any;
  eventOptionsToAddDescription = [] as any;
  eventShowPartData = {} as EventShowParticipantData;
  timeOfEvent;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private alertify: AlertifyService,
    private getSeededData: GetSeededDataService,
    private dateService: DateService,
  ) {

  }

  ngOnInit() {
    this.eventId = +this.route.snapshot.paramMap.get('eventId');
    this.minDate = this.dateService.getTodaysDate();
    this.eventService.getEventById(this.eventId).subscribe(
      next => {
        this.currentEvent = next;

        this.compareDates();
        this.timeOfEvent = this.getTime(this.currentEvent.dateTimeOfEvent);

        // Data to be send to ViewParticipantsComponent
        this.eventShowPartData.eventId = this.eventId;
        this.eventShowPartData.rsvp = this.currentEvent.rsvp;

        this.getSeededData.getEventOptions().subscribe(nextOpt => {
          this.allEventOptions = nextOpt;
          let index = 0;
          for (let i = 0; i < this.allEventOptions.length; i++) {
            this.eventOptionsToAddId[i] = String(this.allEventOptions[i][0].id);
            for (let j = 0; j < this.allEventOptions[i].length; j++) {
              this.allEventOptionsDescription[index] = this.allEventOptions[i][
                j
              ].description;
              index++;
            }
          }
          for (let i = 0; i < this.allEventOptions.length; i++) {
            this.eventOptionsToAddDescription[
              i
            ] = this.allEventOptionsDescription[
              this.currentEvent.eventOptions[+i] - 1
              ];
          }
        });
        this.eventLoaded = true;
      },
      error => {
        this.alertify.errorRetrievingData();
      }
    );


  }

  editEvent(form) {
    this.eventToSendToDB = JSON.parse(JSON.stringify(this.currentEvent));
    this.eventToSendToDB.dateTimeOfEvent = this.dateService.parseDateAndTime(this.currentEvent.dateTimeOfEvent, this.timeOfEvent);

    if (!arrEqual(this.currentEvent.eventOptions, this.eventOptionsToAddId)) {
      this.eventToSendToDB.eventOptions = this.eventOptionsToAddId;
    } else {
      delete this.eventToSendToDB.eventOptions;
    }

    this.eventService.editEvent(this.eventToSendToDB).subscribe(next => {

      // To Fix, After successfull update "Save Changes" button needs to be disabled again

    });
  }

  changeDescription(allEventOptionsId, id) {
    this.eventOptionsToAddDescription[+id] = this.allEventOptionsDescription[
      +allEventOptionsId
    ];

  }



  compareDates() {
    // RSVP
    const rsvpDate = new Date(Date.parse(this.currentEvent.rsvp));
    if (this.minDate > rsvpDate) {
      this.canChangeRSVP = false;
    }

    // giftsShuffled
    const addGiftsByDate = new Date(Date.parse(this.currentEvent.giftsAddBy));
    if (this.minDate > addGiftsByDate) {
      this.giftsShuffled = true;
    }
  }

  getTime(date) {
    const newDate = new Date(date);
    const timeArr = newDate.toTimeString().split(':');
    return timeArr[0] + ':' + timeArr[1];
  }
}



function arrEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}


