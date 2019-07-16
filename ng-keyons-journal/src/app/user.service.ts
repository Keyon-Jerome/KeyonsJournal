import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user: {username:string, CreatePassword:string, userId:string, email: string};

  url = 'localhost:8000/KeyonsJournal/php/main.php';
  createUserData: {CreateUsername: string, CreatePassword: string, CreateEmail: string};

  constructor(private http: HttpClient) { }

  updateCreateUserData(username: string, pass: string, email: string) {
    this.createUserData.CreateUsername = username;
    this.createUserData.CreatePassword = pass;
    this.createUserData.CreateEmail = email;
  }

  createUser(username: string, pass: string, email: string) {
    console.log(username + " " + pass + " " + email);
    this.updateCreateUserData(username, pass, email);
    this.http.post(this.url, this.createUserData).subscribe(responseData => {
      console.log(responseData);
    });
  }


}
