import { Component, Input, OnInit } from '@angular/core';
import {TransactionInterface} from "../models/transaction.interface";

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.scss'],
})
export class MyTransactionsComponent implements OnInit {
  @Input() dataSource: TransactionInterface[];
  @Input() total: number;
  constructor() { }

  ngOnInit() {}

}
