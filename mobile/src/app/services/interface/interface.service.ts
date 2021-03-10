import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../../models/user.interface";
import {Observable, Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ClientInterface} from "../../models/client.interface";

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {
  public connectedUser: UserInterface;
  public userSubscription: Subscription;
  private _helper : JwtHelperService;
  constructor(private http: HttpClient) {
    this._helper = new JwtHelperService();
  }

  getTokenPayload(){
    const token = localStorage.getItem(environment.token);
    return this._helper.decodeToken(token);
  }
  get helper() {
    return this._helper;
  }
  getConnectedUser(id: number){
    this.userSubscription = this.getUser(id)
      .subscribe(
        (user: UserInterface) => {
          this.connectedUser = user;
        }
      );
  }
  isAdmin() {
    const token = localStorage.getItem(environment.token);
    const decodedToken = this._helper.decodeToken(token);
    return decodedToken.roles[0] == 'ROLE_ADMIN_AGENCE';
  }
  getUser(id: number): Observable<UserInterface> {
    return  this.http.get<UserInterface>(`${environment.api}/admin/users/${id}`);
  }
  getClientByNci(nicNumber: string): Observable<ClientInterface> {
    return this.http.get<ClientInterface>(`${environment.api}/user/client/nci/${nicNumber}`);
  }
}
