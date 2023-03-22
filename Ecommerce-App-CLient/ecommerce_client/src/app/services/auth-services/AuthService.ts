// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
// import { User } from '../model/User';


// @Injectable()
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(false); 

//   get isLoggedIn() {
//     return this.loggedIn.asObservable(); 

//   }

//   constructor(
//     private router: Router
//   ) {}

//   loginAuth(verdict: boolean){
//     if (verdict==true ) { 
//       this.loggedIn.next(true);
//       this.router.navigate(['/product-list']);
//     }
//   }

//   logout() {                          
//     localStorage.removeItem('User');
//     this.router.navigate(['/login']);
//   }
// }


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,private loginService:LoginService,private toastr: ToastrService) { }

    loginAuth(verdict: boolean){
    if (verdict==true ) { 
      // this.loggedIn.next(true);
      this.loginService.notify(true);
      this.router.navigate(['/product-list']);
      this.toastr.success('Success!', 'Log in Successfull.');
    }
    else{
      this.toastr.warning('Warning!', 'Login Failed!');
    }
  }

 
  logout() {                          
        localStorage.removeItem('User');
        localStorage.removeItem('Token');
        this.router.navigate(['/login']);
      }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem("User");
    return !!authToken; 
  }
}