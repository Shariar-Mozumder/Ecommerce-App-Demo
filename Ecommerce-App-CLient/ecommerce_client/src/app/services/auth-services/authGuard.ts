import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Authentication } from './Authentication';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  if (Authentication.isLoginAuthenticated()) {
    return true;
  } else {
    return false;
  }
}
}


