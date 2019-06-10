
import { PasswordMatch } from './../_validators/passwordMatch';
import { Validator } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordService } from '../_services/password.service';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-passsword-change',
  templateUrl: './passsword-change.component.html',
  styleUrls: ['./passsword-change.component.css']
})
export class PassswordChangeComponent implements OnInit, OnDestroy {



  passChangeForm: FormGroup;

  jwtToken: string;
  formToSend = {} as any;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private passwordService: PasswordService,
              private authService: AuthService,
              private route: Router) {

    this.jwtToken = this.activatedRoute.snapshot.paramMap.get('jwtToken');
    localStorage.setItem('passChangeToken', this.jwtToken);

    this.passChangeForm = fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]
    }, {
        validator: PasswordMatch.MatchPassword
      });
  }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      localStorage.removeItem('token');
    }
  }

  changePassword(form) {

    this.formToSend.password = form.password;
    this.formToSend.userId = this.authService.decodedPassChangeToken().nameid;
    this.formToSend.email = this.authService.decodedPassChangeToken().unique_name;
    
    this.passwordService.changePassword(this.formToSend).subscribe(next => {
      this.route.navigate(['/login']);
    }, error => {
    })



  }

  ngOnDestroy() {
    localStorage.removeItem('passChangeToken');
  }

}
