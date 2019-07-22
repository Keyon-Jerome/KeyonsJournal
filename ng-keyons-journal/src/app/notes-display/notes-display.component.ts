import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../user.service';
import { NoteCreationService } from '../note-creation.service';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {
  notes =  this.userService.allEntriesData;

  desired_columns = 4;

  constructor(private userService: UserService, private noteCreationService: NoteCreationService) { }

  ngOnInit() {

    this.userService.getJournalEntries();
    this.checkForPreviousEntries();

  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  // Checks for any previous entries.
  // If there are no previous entries, launches a customized note creation dialog for creating your first note.
  checkForPreviousEntries() {
    this.delay(500).then(any => {
      if (this.userService.allEntriesData.length == 0)  {
        this.noteCreationService.openDialog(undefined, true);
      }
    });

  }
}
