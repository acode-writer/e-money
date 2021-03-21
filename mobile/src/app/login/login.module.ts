import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "../services/login/login.service";
import {IonicStorageModule} from "@ionic/storage";
import {InterfaceService} from "../services/interface/interface.service";
import {AuthInterceptorProvider} from "../interceptors/auth.interceptor";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicStorageModule.forRoot(),
  ],
  declarations: [LoginPage],
  providers: [
    LoginService,
    InterfaceService
  ]
})
export class LoginPageModule {}
