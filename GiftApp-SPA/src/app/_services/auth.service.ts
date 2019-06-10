import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {


  private basicUrl: string;
  private helper = new JwtHelperService();
  decodedToken: any;


  public currentlyLoggedInName =  new BehaviorSubject<string>(this.loggedIn() ? this.decoded().unique_name : ' ');

  constructor(private http: HttpClient, private router: Router) {
    if (environment.production === false) {
      this.basicUrl = 'http://localhost:5000/api/auth/';
    } else {
      this.basicUrl = 'api/auth/';
    }
  }

  login(model: any) {
    return this.http.post(this.basicUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token );
            this.currentlyLoggedInName.next(this.decoded().unique_name);
          }
        })
      );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  decoded() {
    const token = localStorage.getItem('token');
    return this.helper.decodeToken(token);
  }
  decodedPassChangeToken() {
    const token = localStorage.getItem('passChangeToken');
    return this.helper.decodeToken(token);
  }

  passChangeToken() {
    const token = localStorage.getItem('passChangeToken');
    return !this.helper.isTokenExpired(token);
  }
}
