import { ShuffleGiftService } from './../../../_services/shuffle-gift.service';
import { Component, OnInit, Input } from '@angular/core';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-shuffled-gifts',
  templateUrl: './shuffled-gifts.component.html',
  styleUrls: ['./shuffled-gifts.component.css']
})
export class ShuffledGiftsComponent implements OnInit {

  @Input() eventId;

  loaded = false;
  giftShuffleData;


  constructor(private shuffleGiftService: ShuffleGiftService) { }

  ngOnInit() {
    this.shuffleGiftService.getShuffleGiftData(this.eventId).subscribe(next => {
      this.giftShuffleData = next;
      console.log(next);
      this.loaded = true;
    })
  }

}
