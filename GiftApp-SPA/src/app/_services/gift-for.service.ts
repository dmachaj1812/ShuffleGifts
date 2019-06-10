import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiftForService {

  private basicUrl: string;
  private JwtHelper = new JwtHelperService();
  private token: any;
  private userId: number;

  constructor(private http: HttpClient) {
    if (environment.production === false) {
      this.basicUrl = 'http://localhost:5000/api/GiftFor/';
    } else {
      this.basicUrl = 'api/GiftFor/';
    }
   }

  getGiftFor() {
    this.token = localStorage.getItem('token');
    this.userId = this.JwtHelper.decodeToken(this.token).nameid;

    return this.http.get(this.basicUrl + 'giftfor/' + this.userId);
  }
}
