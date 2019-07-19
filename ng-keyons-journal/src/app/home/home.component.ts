import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AddNoteButtonComponent } from '../add-note-button/add-note-button.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.openSnackBar()
  }

  openSnackBar() {
    this.snackBar.openFromComponent(AddNoteButtonComponent,  {horizontalPosition: 'right',
    verticalPosition: 'bottom',
    panelClass: 'snackBarInfo',});

  }

}
