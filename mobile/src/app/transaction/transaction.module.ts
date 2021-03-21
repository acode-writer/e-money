import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPageRoutingModule } from './transaction-routing.module';

import { TransactionPage } from './transaction.page';
import {AuthInterceptorProvider} from "../interceptors/auth.interceptor";
import {TransactionService} from "../services/transaction/transaction.service";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionPageRoutingModule,
  ],
  declarations: [TransactionPage],
  providers: [
    AuthInterceptorProvider,
    TransactionService,
  ]
})
export class TransactionPageModule {}
