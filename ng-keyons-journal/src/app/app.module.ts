import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { CreateuserdialogComponent } from './createuserdialog/createuserdialog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotesDisplayComponent } from './notes-display/notes-display.component';
import { SingleNoteComponent } from './single-note/single-note.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import {MatCardModule, MatCard} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { AddNoteButtonComponent } from './add-note-button/add-note-button.component';
import {MatSnackBarModule} from '@angular/material';
import { CreatenotedialogComponent } from './createnotedialog/createnotedialog.component';
import {KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { KeyboardShortcutComponent } from './keyboard-shortcut/keyboard-shortcut.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    CreateuserdialogComponent,
    HomeComponent,
    NotesDisplayComponent,
    SingleNoteComponent,
    CreateNoteComponent,
    AddNoteButtonComponent,
    CreatenotedialogComponent,
    KeyboardShortcutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    FlexLayoutModule,
    ScrollDispatchModule,
    MatSnackBarModule,
    KeyboardShortcutsModule.forRoot()
    // MatDialogRef,

  ],
  providers: [MatDialog],
  bootstrap: [AppComponent],
  entryComponents: [CreateuserdialogComponent, AddNoteButtonComponent, CreatenotedialogComponent],
})
export class AppModule { }
