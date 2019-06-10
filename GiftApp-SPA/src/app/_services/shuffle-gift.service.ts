import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventDetailsComponent } from '../_event/event-details/event-details/event-details.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ShuffleGiftService {
  private helper = new JwtHelperService();
  basicUrl: string;

  constructor(private http: HttpClient) {
    if (environment.production === false) {
      this.basicUrl = 'http://localhost:5000/api/ShuffleGiftUser/';
    } else {
      this.basicUrl = 'api/GiftPicker/';
    }
  }

  getShuffleGiftData(eventId) {
    return this.http.get(this.basicUrl + 'getShuffleGiftData/' + eventId + '/' + this.getUserId());
  }

  private getUserId() {
    return this.helper.decodeToken(localStorage.getItem('token')).nameid;
  }
}
