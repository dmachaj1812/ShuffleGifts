import { PasswordService } from '../_services/password.service';
import { AlertifyService } from "./../_services/alertify.service";
import { AuthService } from "./../_services/auth.service";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {


  @Output() loginSuccessful = new EventEmitter();

  rForm: FormGroup;
  resetPassForm: FormGroup;


  user = {} as any;
  admin = {} as any;
  resetPassButton = false;
  resetPasswordForm = false;
  ressetPasswordFormSucces = false;
  loginForm = true;


  constructor(
    public auth: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private fBuilder: FormBuilder,
    private passwordResetService: PasswordService
  ) {
    this.rForm = fBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.required],
    });

    this.resetPassForm = fBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() { }

  openPasswordResetForm() {
    this.loginForm = false;
    this.resetPasswordForm = true;
  }

  passwordReset(form: any) {

    console.log(form);
    this.passwordResetService.getPasswordResetToken(form).subscribe(next => {
      this.ressetPasswordFormSucces = true;
      this.resetPasswordForm = false;
    }, error => {
      console.log(error);
    })
  }

  userLogin(form: any) {

    this.user.email = form.email;
    this.user.password = form.password;

    this.auth.login(this.user).subscribe(
      next => {
        this.loginSuccessful.emit();
        this.router.navigate(['/']);
      },
      error => {
        if (error.statusText === 'Unauthorized') {
          this.alertify.error('Your email or password do not match.');
          this.resetPassButton = true;
        } else {
          this.alertify.errorRetrievingData();
        }
      }
    );
  }
}
