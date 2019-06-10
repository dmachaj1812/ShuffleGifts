import { AuthService } from './../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { GiftService } from './../_services/gift.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.css']
})
export class AddGiftComponent implements OnInit {


  eventName: string;
  eventId: number;
  giftIndex: number;
  gift = {} as any;
  giftList = [] as any;
  giftsToSendToDB = {} as any;
  wishListGifts;


  dataSource = new MatTableDataSource(this.giftList);
  displayedColumns: string[] = ['index', 'giftName', 'link', 'price', 'description', 'options'];

  constructor(private giftService: GiftService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location) {


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventName = params['eventName'];
      this.eventId = +params['eventId'];
    });

    this.giftService.getAllWishListGifts().subscribe(next => {
      this.wishListGifts = next;
    }, error => {

    });
  }

  addGiftToList(f) {
    this.giftList.push(f.value);
    this.dataSource._updateChangeSubscription();
    f.reset();
  }
  addGiftToListWishList(gift) {
    if (this.giftList.includes(gift)) {
      this.deleteGift(gift);
    }else {
      this.giftList.push(gift);
      this.dataSource._updateChangeSubscription();
    }


  }
  deleteGift(gift) {
    this.giftIndex = this.giftList.indexOf(gift);
    this.giftList.splice(this.giftIndex, 1);
    this.dataSource._updateChangeSubscription();
  }
  addAllToDB() {
    this.giftsToSendToDB.eventId = this.eventId;
    this.giftsToSendToDB.userId = this.authService.decoded().nameid;
    this.giftsToSendToDB.gifts = this.giftList;


  }
}

