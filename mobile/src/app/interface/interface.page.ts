import {Component, OnDestroy, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";
import {InterfaceService} from "../services/interface/interface.service";

@Component({
  selector: 'app-interface',
  templateUrl: './interface.page.html',
  styleUrls: ['./interface.page.scss'],
})
export class InterfacePage implements OnInit, OnDestroy {
  public isAdmin = false;
  constructor(public interfaceService: InterfaceService) { }

  ngOnInit() {
    const token = localStorage.getItem(environment.token);
    const decodedToken = this.interfaceService.helper.decodeToken(token);
    const id = decodedToken.id;
    this.interfaceService.getConnectedUser(id);
    this.isAdmin = this.interfaceService.isAdmin();
  }

  ngOnDestroy(): void {
    this.interfaceService.userSubscription?.unsubscribe();
    this.interfaceService.userSubscription?.unsubscribe();
  }

}
