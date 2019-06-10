import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  basicUrl: string;

  constructor(private http: HttpClient) {
    if (environment.production === false) {
      this.basicUrl = 'http://localhost:5000/api/comment/';
    } else {
      this.basicUrl = 'api/user/';
    }
   }

   addCommment(addCommentDto: {}) {
      return this.http.post(this.basicUrl + 'addComment', addCommentDto);
   }

   getAllComment(eventId: number) {
     return this.http.get(this.basicUrl + 'getAll/' + eventId);
   }
}
