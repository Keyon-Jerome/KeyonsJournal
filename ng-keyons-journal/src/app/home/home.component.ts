import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatSnackBarRef } from '@angular/material';
import { AddNoteButtonComponent } from '../add-note-button/add-note-button.component';
import { CreatenotedialogComponent } from '../createnotedialog/createnotedialog.component';
import { NoteCreationService } from '../note-creation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog, private noteCreationService: NoteCreationService) { }

  ngOnInit() {
    this.openSnackBar();
  }

  openSnackBar() {
    // this.snackBar.openFromComponent(AddNoteButtonComponent,
    //    {horizontalPosition: 'right',
    // verticalPosition: 'bottom',
    // panelClass: 'snackBarInfo',});
    // const snackBarRef = this.snackBar.open('', 'NEW NOTE', {horizontalPosition: 'right',
    // verticalPosition: 'bottom',
    // panelClass: 'snackBarInfo', });
    // snackBarRef.onAction().subscribe(() => this.noteCreationService.openDialog());
    this.noteCreationService.openSnackBar();
  }





}
