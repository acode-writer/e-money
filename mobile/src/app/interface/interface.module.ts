import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AlertController, IonicModule, Platform} from '@ionic/angular';

import { InterfacePageRoutingModule } from './interface-routing.module';

import { InterfacePage } from './interface.page';
import {HttpClientModule} from "@angular/common/http";
import {AuthInterceptorProvider} from "../interceptors/auth.interceptor";
import {IonicStorageModule} from "@ionic/storage";
import {LoginService} from "../services/login/login.service";
import {InterfaceService} from "../services/interface/interface.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    InterfacePageRoutingModule,
  ],
  declarations: [InterfacePage],
  providers: [
    AlertController,
    AuthInterceptorProvider,
  ]
})
export class InterfacePageModule {}
