import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../../models/user.interface";
import {BehaviorSubject, from, Observable, Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ClientInterface} from "../../models/client.interface";
import {LoginService} from "../login/login.service";
import {map} from "rxjs/operators";
import {log} from "util";
import {TokenPayloadInterface} from "../../models/token-payload.interface";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class InterfaceService {
  public connectedUser = new BehaviorSubject(null);
  public userSubscription: Subscription;
  user = new BehaviorSubject(null);
  public solde = new BehaviorSubject(0);
  private _helper : JwtHelperService;
  public tokenPayload: TokenPayloadInterface;
  public _isAdmin = new BehaviorSubject(false);
  private role = 'ROLE_ADMIN_AGENCE';
  private loginPath = '/login';
  constructor(private http: HttpClient, private loginService: LoginService,
              private alertCtrl: AlertController, private router: Router) {
    this._helper = new JwtHelperService();
  }

  getTokenPayload(token: string){
    return this._helper.decodeToken(token);
  }
  get helper() {
    return this._helper;
  }
  async getPayload() {
     this.loginService.getData(environment.token).then(
      token => {
        const payload = this.getTokenPayload(token);
        this.tokenPayload = payload;
        this.user.next(payload);
        this._isAdmin.next(this.isAdmin(payload.roles[0]));
      }
    )
  }
  async saveConnectedUser(id: number){
    await this.getUserById(id).subscribe(
      response => {
        this.connectedUser.next(response);
        return  this.loginService.setData(environment.connectedUser,response);
      }
    )
  }
  async getConnectedUser(){
    await this.loginService.getData(environment.token).then(
      token => {
        const payload = this.getTokenPayload(token);
        this.userSubscription = this.getUserById(payload.id).subscribe(
          response => {
              const solde = response?.agence?.account.balance || 0;
              this.connectedUser.next(response);
              this.solde.next(solde);
              this._isAdmin.next(this.isAdmin(payload.roles[0]));
              return  this.loginService.setData(environment.connectedUser,response);
          },
          error => {
            if ( error.status == 401){
              this.alertError('Session Expired','Votre session a expiré. Veuillez vous reconnecter.');
            }
          }
        )
      }
    )
  }
  isAdmin(role: string) {
    return role == this.role;
  }
  getUserById(id: number): Observable<UserInterface> {
    return  this.http.get<UserInterface>(`${environment.api}/admin/users/${id}`);
  }
  getClientByNci(nicNumber: string): Observable<ClientInterface> {
    return this.http.get<ClientInterface>(`${environment.api}/user/client/nci/${nicNumber}`);
  }
  getClientByPhoneNumber(phoneNumber: string): Observable<ClientInterface> {
    return this.http.get<ClientInterface>(`${environment.api}/user/client/phone-number/${phoneNumber}`);
  }
  async alertError(title: string, message: string){
    const alertDisplayer = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Se reconnecter',
          handler: () => this.router.navigateByUrl(this.loginPath)
        }
      ]
    });
    await alertDisplayer.present();
  }
}
