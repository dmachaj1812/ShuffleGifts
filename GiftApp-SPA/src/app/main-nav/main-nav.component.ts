import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  userName;
  loggedInSub;
  toolbarMessage;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService, private alertify: AlertifyService) { }


  ngOnInit() {
    this.loggedInSub = this.authService.currentlyLoggedInName.subscribe(next => {
      this.userName = next;
      this.toolbarMessage = this.authService.loggedIn() ? 'Hi ' + this.userName + '!' : 'Menu';
    });


  }

  logout() {
    this.authService.logout();
    this.toolbarMessage = 'Menu';
  }

  logoutSideBar(drawer: any) {
    this.authService.logout();
    this.toolbarMessage = 'Menu';
    drawer.toggle();
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }

}
