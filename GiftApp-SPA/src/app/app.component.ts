
import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private helper = new JwtHelperService();
  constructor(public auth: AuthService, public route: Router) {

  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.decodedToken = this.helper.decodeToken(token);
    }
  }
}
