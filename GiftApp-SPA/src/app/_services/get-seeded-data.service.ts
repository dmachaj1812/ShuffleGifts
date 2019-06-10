import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetSeededDataService {
  basicUrl: string;
  constructor(private http: HttpClient) {
    if (environment.production === false) {
      this.basicUrl = 'http://localhost:5000/api/GetSeededData/';
    } else {
      this.basicUrl = 'api/auth/';
    }
  }

  getEventOptions() {
    return this.http.get(this.basicUrl + 'getEventOptions');
  }
}
