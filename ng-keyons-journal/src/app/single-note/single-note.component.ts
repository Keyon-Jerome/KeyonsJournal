import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {
  @Input() header:string;
  @Input() date:string;
  @Input() content:string;
  constructor() {
    // this.header = 'CONSTRUCTING';
    // this.content = 'CONSTRUCTING';
    // this.date = 'CONSTRUCTING';
  }

  ngOnInit() {
  }

}
