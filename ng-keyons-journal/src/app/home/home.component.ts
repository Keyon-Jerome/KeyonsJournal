import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatSnackBarRef } from '@angular/material';
import { AddNoteButtonComponent } from '../add-note-button/add-note-button.component';
import { CreatenotedialogComponent } from '../createnotedialog/createnotedialog.component';
import { NoteCreationService } from '../note-creation.service';
import { ShortcutInput, ShortcutEventOutput } from 'ng-keyboard-shortcuts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog, private noteCreationService: NoteCreationService) { }
  shortcuts: ShortcutInput[] = [];
  ngOnInit() {
    this.openSnackBar();
  }
  ngAfterViewInit() {
    this.shortcuts.push(            {
      key: ['ctrl + b'],
      label: 'Sequences',
      description: 'Sequence ctrl and b',
      command: (output: ShortcutEventOutput) => this.noteCreationService.openDialog(),
      preventDefault: true
  }, );

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
