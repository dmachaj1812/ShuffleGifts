import { GiftService } from './../../../_services/gift.service';
import { EventGiftData } from './../../../_models/eventGiftData';
import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { ShowGiftType } from 'src/app/_gift/show-gifts/show-gift-type';
import { DateService } from 'src/app/_services/date.service';
import { ShowGiftData } from 'src/app/_models/showGiftData';
import { CreateGiftData } from 'src/app/_models/createGiftData';

@Component({
  selector: 'app-my-gifts-list-event',
  templateUrl: './my-gifts-list-event.component.html',
  styleUrls: ['./my-gifts-list-event.component.css']
})
export class MyGiftsListEventComponent implements OnInit, OnDestroy, OnChanges {



  @Input() eventGiftData: EventGiftData;

  createGiftData = {} as CreateGiftData;
  isLoaded = false;
  totalPrice: number = 0;
  canEdit: boolean;
  howManyGiftsOption: Number;
  whoChooses: string;
  allGifts = [] as any;
  showGiftData = {} as ShowGiftData;

  totalPriceSub;

  constructor(private giftService: GiftService, private dateService: DateService) { }

  ngOnInit() {

    this.totalPrice = 0;

    if (this.eventGiftData.eventOptions.includes('3')) {
      this.howManyGiftsOption = 3; // One of Many Gifts
    } else {
      this.howManyGiftsOption = 4; // One Gift
    }

    if (this.eventGiftData.eventOptions.includes('5')) {
      this.whoChooses = 'an algoritm will choose which gifts to get you.';
    } else {
      this.whoChooses = 'your gift giver will choose which gifts to get you.';
    }

    this.giftService.getAllGifts(this.eventGiftData.eventId).subscribe(next => {
      this.allGifts = next;
      this.canEdit = this.dateService.getTodaysDate() < new Date(this.eventGiftData.addGiftsBy);

      this.showGiftData.canEdit = this.canEdit;
      this.showGiftData.giftsToShow = this.allGifts;
      this.showGiftData.eventId = this.eventGiftData.eventId;
      this.showGiftData.showGiftType = ShowGiftType.userEventType();

      this.createGiftData.addTo = 'ADD TO ' + this.eventGiftData.eventName.toUpperCase();
      this.createGiftData.eventId = this.eventGiftData.eventId;
      this.createGiftData.giftType = this.showGiftData.showGiftType = ShowGiftType.userEventType();

      this.isLoaded = true;
    }, error => {
    });
  }

  ngOnChanges() {
    this.totalPriceSub = this.giftService.totalPrice.subscribe(next => {
      this.totalPrice += next;
    });
  }

  ngOnDestroy() {
    this.totalPrice = 0;
    this.totalPriceSub.unsubscribe();

  }
}
