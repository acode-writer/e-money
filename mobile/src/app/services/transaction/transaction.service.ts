import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {AgenceInterface} from "../../models/agence.interface";
import {environment} from "../../../environments/environment";
import {UserInterface} from "../../models/user.interface";
import {TransactionInterface} from "../../models/transaction.interface";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public allTransactionsSubscription: Subscription;
  public myTransactionsSubscription : Subscription;
  public myTransactions: TransactionInterface[];
  public allTransactions: TransactionInterface[];
  constructor(private http: HttpClient) { }
  getAllTransactions(agenceId: number): Observable<AgenceInterface> {
    return this.http.get<AgenceInterface>(`${environment.api}/agences/${agenceId}/account/transactions`);
  }
  getMyDepositTransactions(userId: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${environment.api}/admin/users/${userId}/deposit_transactions`);
  }
  getMyWithdrawalTransactions(userId: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${environment.api}/admin/users/${userId}/withdrawal_transactions`);
  }
  // getMyTransactions(userId: number): Observable<UserInterface>{
  //   return this.http.get<UserInterface>(`${environment.api}/admin/users/${userId}/deposit_transactions`)
  // }
  getMyTransactionsByDate(userId: number,key:string,date: string, isDeposit: boolean) {
    if(isDeposit) {
      return this.http.get<TransactionInterface[]>(`${environment.api}/admin/users/${userId}/deposit_transactions?${key}=${date}`);
    }else {
      return this.http.get<TransactionInterface[]>(`${environment.api}/admin/users/${userId}/withdrawal_transactions?${key}=${date}`);
    }
  }
  getUserAgence(agenceId: number): Observable<AgenceInterface> {
    return this.http.get<AgenceInterface>(`${environment.api}/agences/${agenceId}/users`)
  }
  calculateTotal(transactions: TransactionInterface[]){
    const reducer = (accumulateur: number, currentValue: TransactionInterface) => accumulateur + currentValue.amount;
    return transactions.reduce(reducer,0);
  }
}
