import { Component, OnInit } from '@angular/core';
import {InterfaceService} from "../services/interface/interface.service";
import {TransactionInterface} from "../models/transaction.interface";
import {UserInterface} from "../models/user.interface";
import {TransactionService} from "../services/transaction/transaction.service";

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
  public dataSource: TransactionInterface[];
  public totalCommission: number;
  constructor(private interfaceService: InterfaceService, private transactionService: TransactionService) { }

  async ngOnInit() {
    await this.interfaceService.getConnectedUser();
    await this.interfaceService.connectedUser.subscribe(
      (user:UserInterface) => {
        if (user) {
          const userId = user.id;
          this.getMyTransactions(userId);
        }
      }
    )
  }
  getMyTransactions(userId: number){
    this.transactionService.myTransactionsSubscription = this.transactionService.getMyTransactions(userId).subscribe(
      transaction => {
        this.transactionService.myTransactions = transaction['hydra:member'];
        this.dataSource = this.transactionService.myTransactions;
        this.totalCommission = this.calculateTotalCommission(this.dataSource, userId);
      }
    );
  }
  calculateTotalCommission(transactions: TransactionInterface[], id: number) {
    const reducer = (accumulator: number, currentValue: TransactionInterface) => {
      const depositId = currentValue.deposit?.id;
      const withdrawalId = currentValue.withdrawal?.id
      if (id == depositId) {
        accumulator += currentValue.depositFees;
      }
      if (id == withdrawalId){
        accumulator += currentValue.withdrawalFees;
      }
      return accumulator;
    }
    return transactions.reduce(reducer,0);
  }
}
