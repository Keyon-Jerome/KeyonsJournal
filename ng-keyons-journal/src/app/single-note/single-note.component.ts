import { Component, OnInit, Input } from '@angular/core';
import { NoteCreationService } from '../note-creation.service';
import { UserService } from '../user.service';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { ConfirmDeleteSheetComponent } from '../confirm-delete-sheet/confirm-delete-sheet.component';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {
  @Input() header: string;
  @Input() date: string;
  @Input() content: string;
  @Input() EntryID: string;
  convertedDate: Date;

  constructor(private snackBar: MatSnackBar, private createNoteService: NoteCreationService, private userService: UserService, private bottomDeleteSheet: MatBottomSheet) {
    // this.header = 'CONSTRUCTING';
    // this.content = 'CONSTRUCTING';
    // this.date = 'CONSTRUCTING';
  }

  ngOnInit() {

    this.convertedDate = new Date(this.date);
    this.convertedDate.toLocaleString();
    this.convertedDate.getTimezoneOffset();
    console.log('\'converted\' date ' + this.convertedDate);
    console.log('Date before conversion: ' + this.date);
    console.log(this.date.toLocaleString());
    this.date = this.date.toLocaleString();
    this.date += ' Z ';
    console.log(this.date);
  }
  onEdit() {
    this.createNoteService.openDialog({EntryID: this.EntryID, Header: this.header, Content: this.content});
    console.log('called');

  }
  onDelete() {
    this.bottomDeleteSheet.open(ConfirmDeleteSheetComponent, {data: {EntryID: this.EntryID}, panelClass: 'backpanel'});
    // this.openDeleteSnackBar();
    // this.createNoteService.openDeleteSnackBar();
  }
  // openDeleteSnackBar() {
  //   // this.snackBar.openFromComponent(AddNoteButtonComponent,
  //   //    {horizontalPosition: 'right',
  //   // verticalPosition: 'bottom',
  //   // panelClass: 'snackBarInfo',});
  //   const snackBarRef = this.snackBar.open('Are you sure you want to delete this note?', 'DELETE', {horizontalPosition: 'center',
  //   verticalPosition: 'top',
  //   panelClass: 'snackBarInfo', });
  //   snackBarRef.onAction().subscribe(() => this.deleteAndOpenSnackBar());

  // }
  // deleteAndOpenSnackBar() {
  //   this.userService.deleteJournalEntry({EntryID: this.EntryID});
  //   this.createNoteService.openSnackBar();

  // }

}
