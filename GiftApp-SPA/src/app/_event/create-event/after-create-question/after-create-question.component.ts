import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-after-create-question',
  templateUrl: './after-create-question.component.html',
  styleUrls: ['./after-create-question.component.css']
})
export class AfterCreateQuestionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AfterCreateQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  yes() {
    this.dialogRef.close(true);
  }
  no() {
    this.dialogRef.close(false);
  }

}
