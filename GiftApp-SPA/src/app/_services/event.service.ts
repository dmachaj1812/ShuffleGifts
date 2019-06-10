
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  basicUrl: string;
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {
    if (environment.production === false) {
      this.basicUrl = 'http://localhost:5000/api/event/';
    } else {
      this.basicUrl = 'api/auth/';
    }
  }

  addevent(event: any) {
    console.log(event);
    return this.http.post(this.basicUrl + 'addEvent', event);
  }

  getAllEvents(userId: number) {
    return this.http.get(this.basicUrl + 'getAll/' + userId);
  }

  getAllHostingEvents(userId: number) {
    return this.http.get(this.basicUrl + 'getAllHostingEvents/' + userId);
  }

  confirmUserEvent(userIdEventId: {}) {
    return this.http.patch(this.basicUrl + 'ConfirmUserEvent', userIdEventId);
  }

  getAllUserEvents(userId: number) {
    return this.http.get(this.basicUrl + 'GetAllUserEvent/' + userId);
  }

  getEventById(eventId: any) {
    return this.http.get(this.basicUrl + 'getbyid/' + eventId);
  }

  deleteEvent(eventId: number) {
    return this.http.delete(this.basicUrl + 'deleteEvent/' + eventId);
  }

  editEvent(eventToEdit: any) {
    return this.http.patch(this.basicUrl + 'edit/', eventToEdit, { observe: 'response' });
  }

  checkUserEventRole(eventId) {
    return this.http.get(this.basicUrl + 'checkUserEventRole/' + eventId + '/' + this.getUserId());
  }


  private getUserId() {
    return this.helper.decodeToken(localStorage.getItem('token')).nameid;
  }
}
