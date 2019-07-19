import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddNoteButtonComponent } from '../add-note-button/add-note-button.component';
import { CreatenotedialogComponent } from '../createnotedialog/createnotedialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.openSnackBar();
  }

  openSnackBar() {
    // this.snackBar.openFromComponent(AddNoteButtonComponent,
    //    {horizontalPosition: 'right',
    // verticalPosition: 'bottom',
    // panelClass: 'snackBarInfo',});
    const snackBarRef = this.snackBar.open('', 'NEW NOTE', {horizontalPosition: 'right',
    verticalPosition: 'bottom',
    panelClass: 'snackBarInfo', });
    snackBarRef.onAction().subscribe(() => this.openDialog());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatenotedialogComponent, {
      width: '500px',
      // data: {username:this.loginUsername}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
