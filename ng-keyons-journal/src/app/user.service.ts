import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8000/KeyonsJournal/php/main.php';
  createUserData: {CreateUsername: string, CreatePassword: string, CreateEmail: string};
  loginUserData: {loginUsername:string, loginPassword:string};

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      //  Authorization: 'authkey',
      //  'Content-Type':  'application/json',
      // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
     // 'Access-Control-Request-Headers': 'Origin, Content-Type, X-Auth-Token',
      // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
      // observe: 'response'
    })
  };

  constructor(private http: HttpClient) {
    this.createUserData = {CreateUsername: '', CreatePassword: '', CreateEmail: ''};
    this.loginUserData = {loginUsername:'',loginPassword:''};

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
  updateLoginUserData(username:string, pass:string) {
    this.loginUserData.loginUsername = username;
    this.loginUserData.loginPassword = pass;

  }


  sendLogin(username:string,pass:string) {
    this.updateLoginUserData(username,pass);
      console.log(this.loginUserData);
    this.http.post(this.url, this.loginUserData, this.httpOptions).subscribe(responseData => {
      console.log(responseData);
    });
  }


}
