import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {
  notes =  this.userService.allEntriesData;

  desired_columns = 4;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getJournalEntries();
  }
  // ngOnChanges() {
  //   this.userService.resetJournalEntries();

  //   this.userService.getJournalEntries();
  // }

}
