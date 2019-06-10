import { AlertifyService } from './../_services/alertify.service';
import { GiftService } from './../_services/gift.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Gift } from '../_models/gift';

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.component.html',
  styleUrls: ['./gift-details.component.css']
})
export class GiftDetailsComponent implements OnInit {

  editModeOff = true;
  gift = {} as Gift;
  initialGift: Gift;

  constructor(private giftService: GiftService,
    private alertify: AlertifyService,
    public dialogRef: MatDialogRef<GiftDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {


  }

  ngOnInit() {
    this.editModeOff = !this.data.editMode;

    this.gift = this.data.gift;
    this.initialGift = JSON.parse(JSON.stringify(this.data.gift));
    console.log(this.initialGift);

  }

  editEnable() {
    this.editModeOff = false;
  }
  saveChanges() {
    this.giftService.editGift(this.gift).subscribe(next => {
      this.dialogRef.close();
    }, error => {
      this.alertify.errorRetrievingData();
    });
  }
  close() {
    this.data.gift.giftName = this.initialGift.giftName;
    this.data.gift.giftUrl = this.initialGift.giftUrl;
    this.data.gift.giftDescription = this.initialGift.giftDescription;
    this.data.gift.price = this.initialGift.price;

    this.dialogRef.close();

  }
}
