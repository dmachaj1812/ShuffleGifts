import { Gift } from './../../_models/gift';
import { AlertifyService } from '../../_services/alertify.service';
import { GiftService } from '../../_services/gift.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { GiftDetailsComponent } from '../../gift-details/gift-details.component';
import { ShowGiftType } from './show-gift-type';
import { ShowGiftData } from 'src/app/_models/showGiftData';

@Component({
  selector: 'app-show-gifts',
  templateUrl: './show-gifts.component.html',
  styleUrls: ['./show-gifts.component.css']
})
export class ShowGiftsComponent implements OnInit, OnDestroy {

  @Input() showGiftData: ShowGiftData;

  changeOccured = false;
  deleteGiftsToSendToDB = {} as any;
  dataSource;
  giftsToDelete = [] as any;
  passGiftSub;
  totalPriceSubstruct = 0;



  displayedColumns: string[] = ['position', 'giftName', 'url', 'price', 'description', 'edit', 'delete'];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private giftService: GiftService,
    private alertify: AlertifyService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.showGiftData.giftsToShow);
    this.dataSource._updateChangeSubscription();

    this.passGiftSub = this.giftService.passGiftSubject.subscribe(next => {
      this.showGiftData.giftsToShow.push(next);
      this.dataSource._updateChangeSubscription();

      if (this.showGiftData.showGiftType === ShowGiftType.userEventType()) {
        this.giftService.updateGiftTotalPrice(+next.price);
      }
    });

    this.giftService.passAllreadyAddedGifts(Object.values(this.showGiftData.giftsToShow).map((x: Gift) => x.id));
    this.giftService.updateGiftTotalPrice(this.getTotalPrice());
  }



  delete(giftToDelete: any) {
    this.changeOccured = true;
    this.totalPriceSubstruct -= +giftToDelete.price;
    giftToDelete.isActive = false;
    this.giftsToDelete.push(giftToDelete);
    this.showGiftData.giftsToShow.splice(this.showGiftData.giftsToShow.indexOf(giftToDelete), 1);
    this.dataSource._updateChangeSubscription();
  }


  saveChanges() {

    const giftIds = this.createArrOfGiftIds(this.giftsToDelete);


    if (this.showGiftData.showGiftType === ShowGiftType.wishListType()) {
      this.giftService.deleteGifts(giftIds).subscribe(next => {
        this.changeOccured = false;
      });
    } else if (this.showGiftData.showGiftType === ShowGiftType.userEventType()) {
      const deleteUserEventGiftDTO = {} as any;
      deleteUserEventGiftDTO.giftIds = giftIds;
      deleteUserEventGiftDTO.eventId = this.showGiftData.eventId;

      this.giftService.deleteWishListGifts(deleteUserEventGiftDTO).subscribe(next => {
        this.changeOccured = false;
      });
    }

    this.giftService.passAllreadyAddedGifts(Object.values(this.showGiftData.giftsToShow).map((x: Gift) => x.id));
    this.giftService.updateGiftTotalPrice(this.totalPriceSubstruct);
    this.totalPriceSubstruct = 0;


  }

  undoChanges() {
    this.totalPriceSubstruct += +this.giftsToDelete[(this.giftsToDelete.length) - 1].price;
    this.showGiftData.giftsToShow.push(this.giftsToDelete[(this.giftsToDelete.length) - 1]);
    this.dataSource._updateChangeSubscription();
    this.giftsToDelete.splice(-1, 1);
    if (this.giftsToDelete.length === 0) {
      this.changeOccured = false;
    }
  }




  giftDetails(gift: {}): void {
    const dialogRef = this.dialog.open(GiftDetailsComponent, {
      data: { gift: gift, editMode: true }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  createArrOfGiftIds(giftArr): number[] {
    const giftIdArr = [];

    for (let i = 0; i < giftArr.length; i++) {
      giftIdArr[i] = this.giftsToDelete[i].id;
    }

    return giftIdArr;
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    const arrPrices = Object.values(this.showGiftData.giftsToShow).map((x: Gift) => x.price);

    arrPrices.forEach(price => {
      totalPrice += +price;
    });

    return totalPrice;
  }

  ngOnDestroy() {
    this.passGiftSub.unsubscribe();
  }
}
