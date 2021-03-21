import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {FraisService} from "../services/frais.service";
import {InterfaceService} from "../services/interface/interface.service";
import {LoginService} from "../services/login/login.service";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage],
  providers: [
    FraisService,
  ]
})
export class TabsPageModule {}
