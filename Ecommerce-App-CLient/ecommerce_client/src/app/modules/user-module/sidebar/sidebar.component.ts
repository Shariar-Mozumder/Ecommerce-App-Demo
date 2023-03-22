import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-services/AuthService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isLoggedIn$!: Observable<boolean>;
  isAdmin:any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    let user:any = localStorage.getItem('User');
    const users = JSON.parse(user);
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin = users.isAdmin;
    debugger
  }

  onLogout() {
    this.authService.logout();
  }
}
