import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/User';


@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}

  }

  constructor(
    private router: Router
  ) {}

  loginAuth(verdict: boolean){
    if (verdict==true ) { // {3}
      this.loggedIn.next(true);
      this.router.navigate(['/product-list']);
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
