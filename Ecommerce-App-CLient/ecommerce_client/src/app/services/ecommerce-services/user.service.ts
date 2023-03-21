import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  private apiURL = 'https://localhost:7058/api/User/'; // Replace with your API endpoint URL

  addUser(user: any): Observable<any> {
    return this.httpClient.post(this.apiURL+'SaveOrUpdateUser', user);
  }

  getUserList(): Observable<any> {
    return this.httpClient.get(this.apiURL+'GetUserList');
  }

  getUserById(obj:any): Observable<any> {
    return this.httpClient.post(this.apiURL+'GetUserByID',obj);
  }
}
