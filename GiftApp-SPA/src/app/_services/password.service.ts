import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  basicUrl: string;

  constructor(private http: HttpClient) {
    if (environment.production === false) {
      this.basicUrl = 'http://localhost:5000/api/Password/';
    } else {
      this.basicUrl = 'api/GiftPicker/';
    }
   }


   getPasswordResetToken(email: string) {
     return this.http.post(this.basicUrl + 'GeneratePasswordResetToken', email );
   }

   changePassword(formToSend: any){



     return this.http.post(this.basicUrl + 'passwordChange', formToSend);
   }
}
