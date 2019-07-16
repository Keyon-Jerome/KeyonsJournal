import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateuserdialogComponent } from '../createuserdialog/createuserdialog.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  hide = true;
  creatingUser = false;
  constructor(private userService: UserService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateuserdialogComponent, {
      width: '500px',
      data: {name: "YEAH", animal: "COW"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit() {
  }
  toggleUserCreation() {
    this.creatingUser = !this.creatingUser;
  }

}


