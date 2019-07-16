import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../user.service';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-createuserdialog',
  templateUrl: './createuserdialog.component.html',
  styleUrls: ['./createuserdialog.component.css'],
  // exports: [CreateuserdialogComponent],
})
export class CreateuserdialogComponent implements OnInit {
  hide = true;
  form: {username:string,password:string,email:string};
  username: string;
  password: string;
  email: string;
  constructor( public dialogRef: MatDialogRef<CreateuserdialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData, private userService:UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.createUser(this.username, this.password,this.email);
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}
