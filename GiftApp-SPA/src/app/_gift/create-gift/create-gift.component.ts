import { Subject } from 'rxjs';
import { GiftService } from './../../_services/gift.service';
import { Gift } from './../../_models/gift';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreateGiftData } from 'src/app/_models/createGiftData';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-create-gift',
  templateUrl: './create-gift.component.html',
  styleUrls: ['./create-gift.component.css']
})
export class CreateGiftComponent implements OnInit {

  @Input() createGiftData: CreateGiftData;

  @Output() passGift = new EventEmitter<Gift>();

  isLoaded = false;
  gift = {} as any;



  constructor(private giftService: GiftService) { }

  ngOnInit() {
    this.gift.giftType = this.createGiftData.giftType;


    if (this.createGiftData.eventId !== null) {
      this.gift.eventId = this.createGiftData.eventId;
    }
    this.isLoaded = true;
  }

  addNewGift(form: any) {
    this.giftService.createNewGift(this.gift).subscribe(next => {
      const giftToPass = JSON.parse(JSON.stringify(next));
      this.giftService.addGiftToShowList(giftToPass);
      form.reset();
    });
  }

}
