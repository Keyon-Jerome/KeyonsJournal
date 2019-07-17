import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, Validators } from '@angular/forms';
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
  loginUsername = '';
  username  = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]);
  password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(24)]);


  constructor(private userService: UserService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateuserdialogComponent, {
      width: '500px',
      data: {username:this.loginUsername}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit() {

  }

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) { return 'You must enter a value'; }
    else if (this.username.hasError('minlength')) { return 'Username must be at least 5 characters long'; }
    else if (this.username.hasError('maxlength')) { return 'Username must be under 16 characters long.'; }
    else {
      return '';
      }
  }
  isFormFinished() {
    return  this.getUsernameErrorMessage() == '' && this.getPasswordErrorMessage() == '';
  }


  getPasswordErrorMessage() {
    if (this.password.hasError('required')) { return 'You must enter a value'; }
    else if (this.password.hasError('minlength')) { return 'Password must be at least 5 characters long'; }
    else if (this.password.hasError('maxlength')) { return 'Password must be under 25 characters long.'; }
    else {
      return '';
      }
  }


  login() {
    if(this.isFormFinished()) {
      console.log(this.username.value + " " + this.password.value);
      this.userService.sendLogin(this.username.value,this.password.value);
    }
  }

}


