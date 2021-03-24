import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPageRoutingModule } from './transaction-routing.module';

import { TransactionPage } from './transaction.page';
import {AuthInterceptorProvider} from "../interceptors/auth.interceptor";
import {TransactionService} from "../services/transaction/transaction.service";
import {MatTableModule} from "@angular/material/table";
import {MyTransactionsComponent} from "../my-transactions/my-transactions.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    TransactionPageRoutingModule,
  ],
  declarations: [TransactionPage,MyTransactionsComponent],
  providers: [
    AuthInterceptorProvider,
    TransactionService,
  ]
})
export class TransactionPageModule {}
