import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { UserService } from '../user.service';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';

@Component({
  selector: 'app-confirm-delete-sheet',
  templateUrl: './confirm-delete-sheet.component.html',
  styleUrls: ['./confirm-delete-sheet.component.css']
})
export class ConfirmDeleteSheetComponent implements OnInit {

  deleteEntryID: string;
  constructor(private bottomSheetRef: MatBottomSheetRef<ConfirmDeleteSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,  private userService: UserService) { }

  ngOnInit() {
    if (this.data !== null) {
        this.deleteEntryID = this.data.EntryID;
    } else {
      console.log('Confirm delete sheet opened without data. ERROR.');
    }
  }

  onCancel() {
    this.bottomSheetRef.dismiss();
  }
  onDelete() {
    this.userService.deleteJournalEntry({EntryID: this.deleteEntryID});
    this.bottomSheetRef.dismiss();
  }

}
