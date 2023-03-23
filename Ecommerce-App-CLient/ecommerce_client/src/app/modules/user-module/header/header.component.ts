import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-services/AuthService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users : any

  constructor(private authService: AuthService) { }
  ngOnInit() {
    let user:any = localStorage.getItem('User');
     this.users = JSON.parse(user);
  }



}
