import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepotPageRoutingModule } from './depot-routing.module';

import { DepotPage } from './depot.page';
import {AuthInterceptorProvider} from "../interceptors/auth.interceptor";
import {InterfaceService} from "../services/interface/interface.service";
import {DepotService} from "../services/depot/depot.service";
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    DepotPageRoutingModule,
  ],
  declarations: [DepotPage],
  providers: [AuthInterceptorProvider,DepotService]
})
export class DepotPageModule {}
