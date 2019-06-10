import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassChangeGuard implements CanActivate {
 constructor(private authService: AuthService, private router: Router) {}

 canActivate(): boolean {
  if (this.authService.passChangeToken() || this.authService.loggedIn()) {
    return true;
  }
  this.router.navigate(['']);
  return false;
}
}
