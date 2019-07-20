import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { CreateuserdialogComponent, DialogData } from '../createuserdialog/createuserdialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-createnotedialog',
  templateUrl: './createnotedialog.component.html',
  styleUrls: ['./createnotedialog.component.css']
})
export class CreatenotedialogComponent implements OnInit {
  title = new FormControl('');
  content = new FormControl('');

  constructor(private snackBar: MatSnackBar,public dialogRef: MatDialogRef<CreateuserdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private userService: UserService,public dialog: MatDialog) { }
    
    ngOnInit() {
    }
    
    openSnackBar() {
      const snackBarRef = this.snackBar.open('', 'NEW NOTE', {horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'snackBarInfo', });
      snackBarRef.onAction().subscribe(() => this.openDialog());
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(CreatenotedialogComponent, {
        width: '90vw',
        minHeight:'40vh',
      });
      
      // dialogRef.beforeClosed().subscribe(result => {
      //   this.openSnackBar();
      // });

      // dialogRef.backdropClick().subscribe( result => {
      //   this.openSnackBar();
      // })
      // dialogRef.afterClosed().subscribe({complete() {
      //   this.openSnackBar();
      // }});
      dialogRef.afterClosed().subscribe(result => {
        this.openSnackBar();
      });
    }

  onCancel() {
    this.dialogRef.close();
    // this.openSnackBar();
  }

  isEmptyOrSpaces(str){
    return !str || str.trim() === '';
}
  onSubmit() {
    if(!this.isEmptyOrSpaces(this.title.value) || !this.isEmptyOrSpaces(this.content.value) )
    {
    this.userService.sendJournalEntry(this.title.value,this.content.value);
    this.dialogRef.close();
    // this.openSnackBar();
    }
  }
}
