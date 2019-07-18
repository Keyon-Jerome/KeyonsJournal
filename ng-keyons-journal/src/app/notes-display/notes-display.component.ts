import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {
  notes=  [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
  desired_columns = 4;
  constructor() { }

  ngOnInit() {
  }

}
