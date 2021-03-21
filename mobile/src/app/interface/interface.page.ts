import {Component, OnDestroy, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";
import {InterfaceService} from "../services/interface/interface.service";
import {LoginService} from "../services/login/login.service";
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.page.html',
  styleUrls: ['./interface.page.scss'],
})
export class InterfacePage implements OnInit, OnDestroy {
  public isAdmin = false;
  private loginPath = '/login';
  constructor(public interfaceService: InterfaceService, private loginService: LoginService,
              private router: Router, private  menu: MenuController) {}

  async ngOnInit() {
    await this.interfaceService.getConnectedUser();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnDestroy(): void {
    // this.interfaceService.userSubscription?.unsubscribe();
  }
  onLogout(){
    this.loginService.logout().then( () => this.router.navigateByUrl(this.loginPath));
  }
}
