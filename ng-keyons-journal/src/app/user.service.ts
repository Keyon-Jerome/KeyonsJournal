import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {map, take, skip, retry} from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { getLocaleDateTimeFormat } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8000/KeyonsJournal/php/main.php';

  createUserData: {CreateUsername: string, CreatePassword: string, CreateEmail: string};
  loginUserData: {loginUsername: string, loginPassword: string};
  currentEntryData: {header: string, content: string, userID: string};
  allEntriesData: {Header: string, Content: string, DateSent: string, EntryID: string, UserID: string}[];

  userID = '';
  userFound: boolean;
  journalEntryCreationStatus = 'Unused';


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      //  Authorization: 'authkey',
      //  'Content-Type':  'application/json',
      // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
     // 'Access-Control-Request-Headers': 'Origin, Content-Type, X-Auth-Token',
      // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
      observe: 'response'
    })
  };

  constructor(private http: HttpClient, private router: Router) {
    this.createUserData = {CreateUsername: '', CreatePassword: '', CreateEmail: ''};
    this.loginUserData = {loginUsername: '', loginPassword: ''};
    this.currentEntryData = {header: '', content: '', userID: this.userID};
    this.allEntriesData = [];

    // this.userFound.found = true;

  }

  updateCreateUserData(username: string, pass: string, email: string) {
      this.createUserData.CreateUsername = username;
      this.createUserData.CreatePassword = pass;
      this.createUserData.CreateEmail = email;
  }

  createUser(username: string, pass: string, email: string) {
      console.log(this.createUserData);
      console.log(username + ' ' + pass + ' ' + email);
      this.updateCreateUserData(username, pass, email);
      this.http.post(this.url, this.createUserData, this.httpOptions).subscribe(responseData => {
        console.log(responseData);
      });
  }

  updateLoginUserData(username: string, pass: string) {
    this.loginUserData.loginUsername = username;
    this.loginUserData.loginPassword = pass;

  }

  sendLogin(username: string, pass: string) {
    this.userFound = false;
    this.updateLoginUserData(username, pass);
    console.log(this.loginUserData);
    this.http.post(this.url, this.loginUserData, this.httpOptions)

    .pipe(skip(0)
    // .pipe(
    //   map(responseData => {
    //   const dataArray = [];
    //   console.log('mapping');
    //   for (const key in responseData) {
    //     if(responseData.hasOwnProperty(key)){
    //       // dataArray.push({...responseData[key], id: key});
    //         dataArray.push({data: responseData[key],id:key});
    //     }
    //   }
    //   console.log(dataArray);
    //   return dataArray;
    // })

    ).subscribe(response => {
    //   try{
    //   console.log(response[0].data);
    //   this.userID = response[0].data;
    //   this.userFound = true;
    //   } catch {
    //     console.log('No user found!');
    //     this.userFound = false;
    //   }
    // });
    const dataArray = [];

    for ( const key in response) {
        if (response.hasOwnProperty(key)) {
          dataArray.push({data: response[key], id: key});
        }
      }

    if (dataArray[0].hasOwnProperty('data')) {
        this.userID = dataArray[0].data;
        console.log(this.userID);
        this.userFound = true;
        this.router.navigate(['home']);
    }

    });
    return !this.userFound;
  }
  updateCurrentEntryData(header: string, content: string) {
    this.currentEntryData.header = header;
    this.currentEntryData.content = content;
    this.currentEntryData.userID = this.userID;
  }
  sendJournalEntry(header: string, content: string) {
    this.updateCurrentEntryData(header, content);
    console.log(this.currentEntryData);
    this.http.post(this.url, this.currentEntryData, this.httpOptions)
    .pipe(take(2))
    .subscribe(
      response => {
        const dataArray = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            dataArray.push({data: response[key], id: key});
          }
        }

        if (dataArray[0].hasOwnProperty('data')) {
          this.journalEntryCreationStatus = dataArray[0].data;
          if (this.journalEntryCreationStatus === 'Entry created successfully!') {
            // this.addJournalEntry(header, content);
            return true;
          } else {
            retry(1);
          }
        } else {
          retry(1);
        }

      });

    this.getLastEntry();

  }

  // addJournalEntry(header: string, content: string) {
  //   const currentDate = new Date();
  //   const _utc = new Date(currentDate.getUTCFullYear(),
  //   currentDate.getUTCMonth(),
  //   currentDate.getUTCDate(),
  //   currentDate.getUTCHours(),
  //   currentDate.getUTCMinutes(),
  //   currentDate.getUTCSeconds());

  //   this.allEntriesData.push(
  //     {Header: header, Content: content, DateSent: _utc.toISOString(), EntryID: 'createdThisSession', UserID: this.userID}
  //     );
  // }
  getLastEntry() {

      this.http.post(this.url, {userID: this.userID}, this.httpOptions)
      .pipe(take(1))
      .subscribe(
        response => {
          const dataArray = [];


          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              dataArray.push({data: response[key], id: key});
            }
          }
          this.allEntriesData.push(dataArray[dataArray.length - 1].data);

        });
  }
  getJournalEntries() {
    // this.allEntriesData = [];
    this.http.post(this.url, {userID: this.userID}, this.httpOptions)
    .pipe(take(1))
    .subscribe(
      response => {
        const dataArray = [];


        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            dataArray.push({data: response[key], id: key});
          }
        }

        for (const item of dataArray) {

            this.allEntriesData.push(item.data);
        }
        console.log(this.allEntriesData);
        console.log(dataArray);
        if (dataArray[0].hasOwnProperty('data')) {
          // this.journalEntryCreationStatus = dataArray[0]['data'];
          // if(this.journalEntryCreationStatus == 'Entry created successfully!') {
          //   return true;
          // }
          // else {
          //   retry(1);
          // }
        } else {
          retry(1);
        }

      });
  }




}
