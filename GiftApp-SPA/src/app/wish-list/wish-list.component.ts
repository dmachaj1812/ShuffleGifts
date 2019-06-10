import { Gift } from './../_models/gift';
import { ShowGiftData } from 'src/app/_models/showGiftData';
import { AlertifyService } from './../_services/alertify.service';
import { GiftService } from './../_services/gift.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { GiftDetailsComponent } from '../gift-details/gift-details.component';
import { ShowGiftType } from '../_gift/show-gifts/show-gift-type';
import { CreateGiftData } from 'src/app/_models/createGiftData';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  passGiftToShowGift = new EventEmitter<Gift>();

  createGiftData = {} as CreateGiftData;
  isLoaded = false;
  gift = {} as any;
  allGifts;

  showGiftData = {} as ShowGiftData;

  constructor(private giftService: GiftService,
    private alertify: AlertifyService,
    public dialog: MatDialog) {
  }


  ngOnInit() {
    this.giftService.getAllWishListGifts().subscribe(next => {
      this.allGifts = next;

      this.showGiftData.canEdit = true;
      this.showGiftData.giftsToShow = this.allGifts;
      this.showGiftData.showGiftType = ShowGiftType.wishListType();

      this.createGiftData.addTo = 'ADD TO WISH LIST';
      this.createGiftData.giftType = ShowGiftType.wishListType();

      this.isLoaded = true;
    }, error => {
      this.alertify.errorRetrievingData();
    });
  }



}
