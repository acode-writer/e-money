import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FraisPageRoutingModule } from './frais-routing.module';

import { FraisPage } from './frais.page';
import {FraisService} from "../services/frais.service";
import {InterfaceService} from "../services/interface/interface.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FraisPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [FraisPage],
  providers: [FraisService,InterfaceService]
})
export class FraisPageModule {}
