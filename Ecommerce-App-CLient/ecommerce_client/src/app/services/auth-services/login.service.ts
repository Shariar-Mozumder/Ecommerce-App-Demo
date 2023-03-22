import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }


  private apiURL = 'https://localhost:7058/api/User/'; // Replace with your API endpoint URL

  login(user: any): Observable<any> {
    return this.httpClient.post(this.apiURL+'login', user);
  }
}
