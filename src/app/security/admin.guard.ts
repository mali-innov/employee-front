import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private user: any;
  private isAdmin: boolean = false;
  public constructor(
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: any | null = sessionStorage.getItem('USER_INFO');
    this.user = JSON.parse(user);

    this.user.roles.forEach((role: any) => {
      if (role.name === 'Admin') {
        this.isAdmin = true;
      }
    });

    return true;
  }

}
