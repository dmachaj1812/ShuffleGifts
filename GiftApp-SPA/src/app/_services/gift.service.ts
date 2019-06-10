import { Gift } from './../_models/gift';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  private basicUrl: string;
  private helper = new JwtHelperService();

  public passGiftSubject = new Subject<Gift>();
  public passAllReadyAddedGiftIdsSubject = new BehaviorSubject<Number[]>([]);
  public totalPrice = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    if (environment.production === false) {
      this.basicUrl = 'http://localhost:5000/api/Gift/';
    } else {
      this.basicUrl = 'api/Gift/';
    }
  }

  createNewGift(giftToAdd: any) {
    giftToAdd.userId = this.getUserId();
    return this.http.post(this.basicUrl + 'createNewGift', giftToAdd);
  }

  getAllGifts(eventId: number) {
    return this.http.get(this.basicUrl + 'getall/' + this.getUserId() + '/' + eventId);
  }

  getAllWishListGifts() {
    return this.http.get(this.basicUrl + 'getAllWishGiftList/' + this.getUserId());
  }

  addFromWishList(giftsToAdd) {
    giftsToAdd.userId = this.getUserId();
    return this.http.post(this.basicUrl + 'AddFromWishList', giftsToAdd);
  }

  editGift(gift: {}) {
    return this.http.post(this.basicUrl + 'editGift', gift);
  }

  deleteGifts(giftIds: any) {
    const deleteGiftDTO = {} as any;
    deleteGiftDTO.giftIds = giftIds;
    return this.http.post(this.basicUrl + 'deleteGift', deleteGiftDTO);
  }

  deleteWishListGifts(deleteUserEventGiftDTO: any) {
    deleteUserEventGiftDTO.userId = this.getUserId();
    return this.http.post(this.basicUrl + 'deleteWishListGift', deleteUserEventGiftDTO);
  }

  addGiftToShowList(gift: Gift) {
    this.passGiftSubject.next(gift);
  }

  passAllreadyAddedGifts(giftIds: Number[]) {
    this.passAllReadyAddedGiftIdsSubject.next(giftIds);
  }

  updateGiftTotalPrice(price: number) {
    console.log(price);
    this.totalPrice.next(price);
  }


  private getUserId() {
    return this.helper.decodeToken(localStorage.getItem('token')).nameid;
  }

}
