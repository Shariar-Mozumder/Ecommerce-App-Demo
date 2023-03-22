import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Output() hideNavBarEvent = new EventEmitter<Boolean>();
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient) {
  }


  private apiURL = 'https://localhost:7058/api/User/'; // Replace with your API endpoint URL

  login(user: any): Observable<any> {
    return this.httpClient.post(this.apiURL+'login', user);
  }
  notify(msg: Boolean) {
    this.hideNavBarEvent.emit(msg);
  }
}
