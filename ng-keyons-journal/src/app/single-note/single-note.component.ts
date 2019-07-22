import { Component, OnInit, Input } from '@angular/core';
import { NoteCreationService } from '../note-creation.service';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material';

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
  constructor(private snackBar: MatSnackBar, private createNoteService: NoteCreationService, private userService: UserService) {
    // this.header = 'CONSTRUCTING';
    // this.content = 'CONSTRUCTING';
    // this.date = 'CONSTRUCTING';
  }

  ngOnInit() {
  }
  onEdit() {
    this.createNoteService.openDialog({EntryID: this.EntryID, Header: this.header, Content: this.content});
    console.log('called');

  }
  onDelete() {
    this.openSnackBar();
    // this.createNoteService.openSnackBar();
  }
  openSnackBar() {
    // this.snackBar.openFromComponent(AddNoteButtonComponent,
    //    {horizontalPosition: 'right',
    // verticalPosition: 'bottom',
    // panelClass: 'snackBarInfo',});
    const snackBarRef = this.snackBar.open('Are you sure you want to delete this note?', 'DELETE', {horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: 'snackBarInfo', });
    snackBarRef.onAction().subscribe(() => this.deleteAndOpenSnackBar());

  }
  deleteAndOpenSnackBar() {
    this.userService.deleteJournalEntry({EntryID: this.EntryID});
    this.createNoteService.openSnackBar();

  }

}
