import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  model = {} as any;
  isCollapsed = true;
  registerFormOpen = true;
  userName;
  loggedInSub;
  navbarOpen = false;


  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.loggedInSub = this.authService.currentlyLoggedInName.subscribe(next => {
      this.userName = next;
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
