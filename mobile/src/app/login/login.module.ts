import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "../services/login/login.service";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [LoginPage],
  providers: [LoginService]
})
export class LoginPageModule {}
