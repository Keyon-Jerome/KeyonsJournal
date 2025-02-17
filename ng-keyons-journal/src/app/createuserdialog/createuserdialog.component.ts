import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../user.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-createuserdialog',
  templateUrl: './createuserdialog.component.html',
  styleUrls: ['./createuserdialog.component.css'],
  // exports: [CreateuserdialogComponent],
})
export class CreateuserdialogComponent implements OnInit {
  hide = true;
  form: {username: string, password: string, email: string};
  username  = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]);
  password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(24)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  createUserPresses = 0;
  pressTime = Date.now();
  constructor( public dialogRef: MatDialogRef<CreateuserdialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { }

  ngOnInit() {

  }


  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getUsernameErrorMessage() {
    if (this.username.hasError('required')) { return 'You must enter a value'; } else if (this.username.hasError('minlength')) { return 'Username must be at least 1 character long.'; } else if (this.username.hasError('maxlength')) { return 'Username must be under 16 characters long.'; } else {
      return '';
      }
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) { return 'You must enter a value'; } else if (this.password.hasError('minlength')) { return 'Password must be at least 5 characters long'; } else if (this.password.hasError('maxlength')) { return 'Password must be under 25 characters long.'; } else {
      return '';
      }
  }
  getUserCreationErrorMessage() {
    // if(this.userService.failedUserCreation) {
      return this.userService.failedUserCreationMessage;
    // }
  }

  isFormFinished() {
    return  this.getEmailErrorMessage() === '' && this.getPasswordErrorMessage() === '' && this.getUsernameErrorMessage() == '';
  }
  onSubmit() {
    if (this.isFormFinished() && Date.now() >= this.pressTime+1000) {
      console.log("create user request sent");
      this.userService.createUser(this.username.value, this.password.value, this.email.value);
      // this.createUserDelay(500);
      this.createUserPresses++;
      this.pressTime = Date.now();
      
      // this.dialogRef.close();

    }
    else {
      console.log(this.isFormFinished());
      console.log(Date.now);
      console.log(this.pressTime+1000);
    }
    // else if(this.isFormFinished())
  }

  onCancel(): void {
    this.dialogRef.close();
  }
//   async createUserDelay(ms: number) {
//     await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.userService.sendLogin(this.username.value, this.password.value));
// }

}
