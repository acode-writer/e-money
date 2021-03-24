import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../../services/login/login.service";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private adminRole = "ROLE_ADMIN_AGENCE";
  private homePath = "/tabs";
  constructor(private loginService: LoginService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.getData(environment.token).then(
      (token )=> {
        if (token) {
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(token);
          return decodedToken.roles[0] == this.adminRole
        }
      }
    );
  }

}
