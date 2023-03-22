import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-services/AuthService';
import { LoginService } from 'src/app/services/auth-services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isAdmin:any;

  constructor(private authService: AuthService,private loginService:LoginService) { }

  ngOnInit() {
    let user:any = localStorage.getItem('User');
    const users = JSON.parse(user);
    this.isAdmin = users.isAdmin;
  }

  onLogout() {
    this.loginService.notify(false);
    this.authService.logout();
  }
}
