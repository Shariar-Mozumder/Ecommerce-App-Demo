import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token :any;
  constructor(private httpClient: HttpClient) {
    this.token=localStorage.getItem('Token');
  }

  private apiURL = 'https://localhost:7058/api/User/'; // Replace with your API endpoint URL

  addUser(user: any): Observable<any> {
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.apiURL+'SaveOrUpdateUser', user,{ headers: header });
  }

  getUserList(): Observable<any> {
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.get(this.apiURL+'GetUserList',{ headers: header });
  }

  getUserById(obj:any): Observable<any> {
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.httpClient.post(this.apiURL+'GetUserByID',obj,{ headers: header });
  }
}
