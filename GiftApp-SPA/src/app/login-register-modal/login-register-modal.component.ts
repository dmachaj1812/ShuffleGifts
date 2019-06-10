import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login-register-modal',
  templateUrl: './login-register-modal.component.html',
  styleUrls: ['./login-register-modal.component.css']
})
export class LoginRegisterModalComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<LoginRegisterModalComponent>) { }

  ngOnInit() {
  }

  loginSuccess() {
    this.dialogRef.close();
  }

  registerSuccess(){
    this.dialogRef.close();
  }
}
