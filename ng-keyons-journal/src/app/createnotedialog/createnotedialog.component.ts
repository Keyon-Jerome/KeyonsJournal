import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { CreateuserdialogComponent} from '../createuserdialog/createuserdialog.component';
import { UserService } from '../user.service';
// import { NoteCreationService } from '../note-creation.service';

@Component({
  selector: 'app-createnotedialog',
  templateUrl: './createnotedialog.component.html',
  styleUrls: ['./createnotedialog.component.css']
})
export class CreatenotedialogComponent implements OnInit {
  title = new FormControl('');
  content = new FormControl('');
  sendButton = 'SUBMIT';
  dialogTitle = 'New Journal Entry';
  editing = false;

  constructor(private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CreateuserdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, public dialog: MatDialog) { }

    ngOnInit() {
      if (this.data !== undefined) {
        this.editing = true;
        this.sendButton = 'Save';
        this.title.setValue(this.data.Header);
        this.content.setValue(this.data.Content);
        this.dialogTitle = 'Edit Journal Entry';
      }
    }

    // openSnackBar() {
    //   this.noteCreationService.openSnackBar();
    //   // const snackBarRef = this.snackBar.open('', 'NEW NOTE', {horizontalPosition: 'right',
    //   // verticalPosition: 'bottom',
    //   // panelClass: 'snackBarInfo', });
    //   // snackBarRef.onAction().subscribe(() => this.openDialog());

    // }

    // openDialog(): void {
    //   const dialogRef = this.dialog.open(CreatenotedialogComponent, {
    //     width: '90vw',
    //     minHeight: '40vh',
    //   });

    //   // dialogRef.beforeClosed().subscribe(result => {
    //   //   this.openSnackBar();
    //   // });

    //   // dialogRef.backdropClick().subscribe( result => {
    //   //   this.openSnackBar();
    //   // })
    //   // dialogRef.afterClosed().subscribe({complete() {
    //   //   this.openSnackBar();
    //   // }});
    //   dialogRef.afterClosed().subscribe(result => {
    //     this.openSnackBar();
    //   });
    // }

  onCancel() {
    this.dialogRef.close();
    // this.openSnackBar();
  }

  isEmptyOrSpaces(str) {
    return !str || str.trim() === '';
}
  onSubmit() {
    if (!this.isEmptyOrSpaces(this.title.value) || !this.isEmptyOrSpaces(this.content.value) ) {
      if (this.editing) {
        console.log('UPDATING ENTRY: ' + this.data.EntryID);
        this.userService.updateJournalEntry(this.data.EntryID);
        this.dialogRef.close();

      } else {
        console.log('SENDING NEW ENTRY');
        this.userService.sendJournalEntry(this.title.value, this.content.value);
        this.dialogRef.close();
        // this.openSnackBar();
      }
    }
  }
}
