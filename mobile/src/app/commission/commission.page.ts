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
  private selectedUser: number;
  constructor(private interfaceService: InterfaceService, private transactionService: TransactionService) { }

  async ngOnInit() {
    await this.interfaceService.getConnectedUser();
    await this.interfaceService.connectedUser.subscribe(
      (user:UserInterface) => {
        if (user) {
          this.selectedUser = user.id;
          this.getMyTransactions(this.selectedUser);
        }
      }
    )
  }
  getMyTransactions(userId: number){
    this.transactionService.getMyDepositTransactions(userId).subscribe(
      (transaction: UserInterface) => {
        this.transactionService.myTransactions = transaction['hydra:member'];
        this.dataSource = this.transactionService.myTransactions;
        this.totalCommission = this.calculateTotalCommission(this.dataSource, userId);
        this.dataSource.map((transaction:TransactionInterface) => transaction.type = "Dépot");
        this.transactionService.getMyWithdrawalTransactions(userId).subscribe(
          (transaction: UserInterface) => {
            transaction['hydra:member'].map((transaction:TransactionInterface) => transaction.type = "Retrait");
            this.transactionService.myTransactions = this.transactionService.myTransactions.concat(transaction['hydra:member']);
            this.dataSource = this.dataSource.concat(transaction['hydra:member']);
            this.totalCommission = this.calculateTotalCommission(this.dataSource, userId);
          }
        );
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
  onSelectType(event) {
    const type = event.target.value;
    if (type == "retrait"){
      this.transactionService.getMyWithdrawalTransactions(this.selectedUser).subscribe(
        (transaction: UserInterface) => {
          this.dataSource = transaction['hydra:member'];
          this.totalCommission = this.calculateTotalCommission(this.dataSource, this.selectedUser);
          this.dataSource.map((transaction:TransactionInterface) => transaction.type = "Dépot");
        }
      );
    }else if (type == "depot") {
      this.transactionService.getMyDepositTransactions(this.selectedUser).subscribe(
        (transaction: UserInterface) => {
          this.dataSource = transaction['hydra:member'];
          this.totalCommission = this.calculateTotalCommission(this.dataSource, this.selectedUser);
          this.dataSource.map((transaction:TransactionInterface) => transaction.type = "Dépot");
        }
      );
    }
  }
  onStartDate(event,isStart: boolean) {
    const value = event.target.value.split('-');
    const startDate = new Date(+value[0],+value[1] - 1,+value[2].substr(0,2));
    if (startDate) {
      this.dataSource = this.dataSource.filter((transaction: TransactionInterface) => {
        const depositAtValue = transaction.depositAt.split('-');
        const depositAtDate = new Date(+depositAtValue[0], +depositAtValue[1], +depositAtValue[2].substr(0,2));
        return isStart ?depositAtDate.getTime() >= startDate.getTime() : depositAtDate.getTime() <= startDate.getTime();
      });
    }
  }
}
