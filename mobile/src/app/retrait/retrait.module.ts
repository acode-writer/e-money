import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetraitPageRoutingModule } from './retrait-routing.module';

import { RetraitPage } from './retrait.page';
import {HttpClientModule} from "@angular/common/http";
import {RetraitService} from "../services/retrait/retrait.service";
import {AuthInterceptorProvider} from "../interceptors/auth.interceptor";
import {IonicStorageModule} from "@ionic/storage";
import {InterfaceService} from "../services/interface/interface.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RetraitPageRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [RetraitPage],
  providers: [RetraitService,AuthInterceptorProvider,InterfaceService]
})
export class RetraitPageModule {}
