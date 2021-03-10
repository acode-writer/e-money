import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { InterfacePageRoutingModule } from './interface-routing.module';

import { InterfacePage } from './interface.page';
import {HttpClientModule} from "@angular/common/http";
import {InterfaceService} from "../services/interface/interface.service";
import {AuthInterceptorProvider} from "../interceptors/auth.interceptor";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    InterfacePageRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [InterfacePage],
  providers:[InterfaceService,AuthInterceptorProvider]
})
export class InterfacePageModule {}
