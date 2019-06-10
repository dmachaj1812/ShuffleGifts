import { AuthService } from './../_services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { PasswordMatch } from '../_validators/passwordMatch';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  newUser = {} as any;
  userToLogin = {} as any;
  newUserForm: FormGroup;

  constructor(private userService: UserService,
              private alertify: AlertifyService,
              private fBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.newUserForm = fBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required]
    }, {
        validator: PasswordMatch.MatchPassword
      });
  }

  // Modal Show/Hide


  @Output() registerSuccessfull = new EventEmitter();



  ngOnInit() { }

  registerNewUser(form: any) {

    this.newUser.userName = form.name;
    this.newUser.email = form.email;
    this.newUser.password = form.password;

    this.userService.addUser(this.newUser).subscribe(next => {
      this.registerSuccessfull.emit();
      this.authService.login({email: this.newUser.email, password: this.newUser.password}).subscribe(next => {
        this.registerSuccessfull.emit();
        this.router.navigate(['']);
      }, error => {

      });
    }, error => {
      if (error.status === 409) {
        this.alertify.error('User with this email already exists.');
      }
    });
  }
}
