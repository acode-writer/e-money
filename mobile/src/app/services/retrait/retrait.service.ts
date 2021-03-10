import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {TransactionInterface} from "../../models/transaction.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RetraitService {

  constructor(private http: HttpClient) { }

  findTransactionByCode(code: string): Observable<TransactionInterface>{
    return this.http.get<TransactionInterface>(`${environment.api}/user/transactions/code?transfertCode=${code}`);
  }
  makeWithdraal(id: number, data: any): Observable<TransactionInterface> {
    return this.http.put<TransactionInterface>(`${environment.api}/user/transactions/${id}/retrait`,data);
  }
}
