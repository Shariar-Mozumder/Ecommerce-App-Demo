import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth-services/AuthService';
import { LoginService } from './services/auth-services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  title = 'ecommerce_client';
  isLoggedIn$!: Observable<boolean>;
  isMenuHide:Boolean = false;


  constructor(private authService: AuthService,private loginService:LoginService) { }

  ngOnInit() {

    this.loginService.hideNavBarEvent.subscribe(res => {
      this.isMenuHide = res;
      })
  }

  onLogout() {
    this.authService.logout();
  }
}
