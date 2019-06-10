import { map } from 'rxjs/operators';
import { Gift } from './../../_models/gift';
import { GiftService } from './../../_services/gift.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-gift-from-wishlist',
  templateUrl: './add-gift-from-wishlist.component.html',
  styleUrls: ['./add-gift-from-wishlist.component.css']
})
export class AddGiftFromWishlistComponent implements OnInit, OnDestroy {

  @Input() eventId;
  @Input() eventName;

  loaded = false;
  allWishlistGifts;
  selectedIds;
  alreadySelectedIds = [];
  giftsToPass;
  allReadyAddedGiftIdsSub;

  constructor(private giftService: GiftService) { }

  ngOnInit() {
    this.giftService.getAllWishListGifts().subscribe(next => {
      this.allWishlistGifts = next;
      this.loaded = true;
    });

    this.allReadyAddedGiftIdsSub = this.giftService.passAllReadyAddedGiftIdsSubject.subscribe(next => {
      this.alreadySelectedIds = next;
    });
  }
  addGifts() {


    const data = {} as any;
    data.eventId = this.eventId;
    data.giftIds = this.getNonRepeatedGiftIds();

    this.giftService.addFromWishList(data).subscribe(next => {
      this.giftService.passAllreadyAddedGifts([...this.alreadySelectedIds, ...data.giftIds]);
      this.giftsToPass = Object.keys(next).map(function (giftIndex) {
        const giftToAdd = next[giftIndex];
        return giftToAdd;
      });

      this.giftsToPass.forEach(gift => {
        this.giftService.addGiftToShowList(gift);
      });
    });
  }

  checkIfAlreadyAdded(giftId: number) {
    if (this.alreadySelectedIds.includes(giftId)) {
      return true;
    }
  }

  getNonRepeatedGiftIds() {
    const giftIds = [];
    this.selectedIds.forEach(element => {
      if (!this.alreadySelectedIds.includes(element)) {
        giftIds.push(element);
      }
    });
    return giftIds;
  }

  ngOnDestroy() {
    this.allReadyAddedGiftIdsSub.unsubscribe();
  }

}
