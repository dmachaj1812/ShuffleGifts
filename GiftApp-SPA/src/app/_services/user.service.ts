import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basicUrl: string;

  constructor(private http: HttpClient) {
    if (environment.production === false) {
      this.basicUrl = 'http://localhost:5000/api/user/';
    } else {
      this.basicUrl = 'api/user/';
    }
  }

  getAll() {
    return this.http.get(this.basicUrl + 'getall');
  }

  deleteUser(id: number) {
    return this.http.delete(this.basicUrl + 'delete/' + id);
  }

 

  addParticipants(participants: any) {
    return this.http.post(this.basicUrl + 'addparticipants', participants);
  }
  addUser(userAdmin: any) {
    return this.http.post(this.basicUrl + 'addUser', userAdmin, {observe: 'response'});
  }
  getAllParticipants(eventId: number) {
    return this.http.get(this.basicUrl + 'GetParticipants/' + eventId);
  }
  getEmails(eventId: number) {
    return this.http.get(this.basicUrl + 'GetEmails/' + eventId);
  }
  deleteParticipant(eventId: number, userId: number){
    return this.http.get(this.basicUrl + 'DeleteParticipant/' + eventId + '/' + userId, {observe: 'response'});
  }
}
