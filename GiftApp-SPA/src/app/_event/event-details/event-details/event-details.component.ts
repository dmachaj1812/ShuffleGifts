import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EventGiftData } from 'src/app/_models/eventGiftData';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  isLoaded = false;
  eventId;
  currentEvent;
  timeOfEvent;
  dateOfEvent;
  displayShuffled = false;
  eventGiftData = {} as EventGiftData;





  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.eventId = +this.activatedRoute.snapshot.paramMap.get('eventId');
    this.eventService.getEventById(this.eventId).subscribe(next => {
      this.currentEvent = next;

      if (this.currentEvent.participantsShuffled && this.currentEvent.giftsShuffled) {
        this.displayShuffled = true;
      }
      this.extractTime(this.currentEvent.dateTimeOfEvent);

      this.eventGiftData.eventId = this.eventId;
      this.eventGiftData.eventName = this.currentEvent.eventName;
      this.eventGiftData.maxPrice = this.currentEvent.maxPrice;
      this.eventGiftData.addGiftsBy = this.currentEvent.giftsAddBy;
      this.eventGiftData.eventOptions = this.currentEvent.eventOptions;


      this.isLoaded = true;

      console.log(this.currentEvent);
    });

  }

  showOnGoogleMap() {
    const address = this.currentEvent.mailingAddress + ' ' +
      this.currentEvent.city + ' ' +
      this.currentEvent.state + ' ' +
      this.currentEvent.zipCode;

    const arrAddress = address.split(' ');

    console.log(arrAddress);

    let url = "https://www.google.com/maps/place/";

    arrAddress.forEach(el => {
      url += el + '+';
    });
    window.open(url, '_blank');
  }

  extractTime(date: string) {
    const newDate = new Date(date);
    const minutes = newDate.getMinutes();
    let hours = newDate.getHours();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const stringMinutes = minutes < 10 ? '0' + minutes.toString() : minutes;


    this.timeOfEvent = hours + ':' + stringMinutes + ' ' + ampm;
  }
}
