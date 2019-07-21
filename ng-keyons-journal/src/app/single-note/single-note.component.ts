import { Component, OnInit, Input } from '@angular/core';
import { NoteCreationService } from '../note-creation.service';
import { UserService } from '../user.service';

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
  constructor(private createNoteService: NoteCreationService, private userService: UserService) {
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

  }

}
