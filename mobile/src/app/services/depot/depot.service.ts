import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {TransactionInterface} from "../../models/transaction.interface";

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http: HttpClient) { }
  makeDeposit(data): Observable<TransactionInterface>{
    return this.http.post<TransactionInterface>(`${environment.api}/user/transactions`, data);
  }
}
