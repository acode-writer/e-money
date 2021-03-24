import {Component, OnDestroy, OnInit} from '@angular/core';
import {InterfaceService} from "../services/interface/interface.service";
import {UserInterface} from "../models/user.interface";
import {TransactionService} from "../services/transaction/transaction.service";
import {TransactionInterface} from "../models/transaction.interface";
import {AgenceInterface} from "../models/agence.interface";
import {log} from "util";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit, OnDestroy {
  private role = 'ROLE_ADMIN_AGENCE';
  public displayedColumns: string[] = ['date', 'utilisateur', 'type', 'montant', 'frais'];
  public dataSource: TransactionInterface[];
  private agenceId: number;
  public total : number;
  public isDeposit: boolean;
  private depositAt: string;
  private withdawAt: string;

  public users: UserInterface[];
  private selectedUser: number;
  public isAll = true;
  constructor(public interfaceService: InterfaceService, private transactionService: TransactionService) { }

  async ngOnInit() {
    await this.interfaceService.getConnectedUser();
    await this.getUserAgence();
    await this.onGetMyTransaction();
  }
  async getUserAgence() {
    await this.interfaceService.connectedUser.subscribe(
      (user: UserInterface) => {
        this.agenceId = user?.agence?.id;
        if (this.agenceId) {
          this.transactionService.getUserAgence(this.agenceId).subscribe(
            (response: AgenceInterface) => {
              if (response) {
                this.users = response.users;
              }
            }
          )
        }
      }
    );
  }

  async onGetMyTransaction() {
    this.isAll = false;
    await this.interfaceService.connectedUser.subscribe(
      (user: UserInterface) => {
        if (user){
          this.selectedUser = user.id;
          this.getMyTransactions(this.selectedUser);
        }
      }
    );
  }
  async onGetAllTransactions() {
    this.isAll = true;
    await this.interfaceService.connectedUser.subscribe(
      (user: UserInterface) => {
        if (user){
          const agencId = user?.agence.id;
          this.getAllTransactions(agencId);
        }
      }
    );
  }
  getAllTransactions(agenceId: number){
  this.transactionService.allTransactionsSubscription = this.transactionService.getAllTransactions(agenceId).subscribe(
    transactions => {
      this.transactionService.allTransactions = transactions['hydra:member'];
      this.dataSource = this.transactionService.myTransactions;
      this.total = this.transactionService.calculateTotal(this.dataSource);
    }
  )
  }
  getMyTransactions(userId: number){
    this.transactionService.getMyDepositTransactions(userId).subscribe(
      (transaction: UserInterface) => {
        this.transactionService.myTransactions = transaction['hydra:member'];
        this.dataSource = this.transactionService.myTransactions;
        this.total = this.transactionService.calculateTotal(this.dataSource);
        this.dataSource.map((transaction:TransactionInterface) => transaction.type = "Dépot");
        this.transactionService.getMyWithdrawalTransactions(userId).subscribe(
          (transaction: UserInterface) => {
            transaction['hydra:member'].map((transaction:TransactionInterface) => transaction.type = "Retrait");
            this.transactionService.myTransactions = this.transactionService.myTransactions.concat(transaction['hydra:member']);
            this.dataSource = this.dataSource.concat(transaction['hydra:member']);
            this.total = this.transactionService.calculateTotal(this.dataSource);
          }
        );
      }
    );
  }
  onSelectedUser(event) {
    this.selectedUser = event.target.value;
    this.getMyTransactions(this.selectedUser);
  }
  onSelectType(event) {
    const type = event.target.value;
    if (type == "retrait"){
      this.isDeposit = false;
      this.transactionService.getMyWithdrawalTransactions(this.selectedUser).subscribe(
        (transaction: UserInterface) => {
          this.dataSource = transaction['hydra:member'];
          this.total = this.transactionService.calculateTotal(this.dataSource);
          this.dataSource.map((transaction:TransactionInterface) => transaction.type = "Dépot");
        }
      );
    }else if (type == "depot") {
      this.isDeposit = true;
      this.transactionService.getMyDepositTransactions(this.selectedUser).subscribe(
        (transaction: UserInterface) => {
          this.dataSource = transaction['hydra:member'];
          this.total = this.transactionService.calculateTotal(this.dataSource);
          this.dataSource.map((transaction:TransactionInterface) => transaction.type = "Dépot");
        }
      );
    }
  }
  onStartDate(event,isStart: boolean) {
    if (isStart) {
      this.depositAt = event.target.value;
      if(this.isDeposit) {
        this.transactionService.getMyTransactionsByDate(this.selectedUser,'depositAt[after]',this.depositAt,true).subscribe(
          (response: TransactionInterface[]) => {
            this.dataSource = response['hydra:member'];
            this.total = this.transactionService.calculateTotal(this.dataSource);
          }
        );
      }else {
        this.transactionService.getMyTransactionsByDate(this.selectedUser,'withdrewAt[after]',this.depositAt,false).subscribe(
          (response: TransactionInterface[]) => {
            this.dataSource = response['hydra:member'];
            this.total = this.transactionService.calculateTotal(this.dataSource);
          }
        );
      }
    }else {
      this.withdawAt = event.target.value;
      if(this.isDeposit) {
        this.transactionService.getMyTransactionsByDate(this.selectedUser,'depositAt[before]',this.depositAt,true).subscribe(
          (response: TransactionInterface[]) => {
            this.dataSource = response['hydra:member'];
            this.total = this.transactionService.calculateTotal(this.dataSource);
          }
        );
      }else {
        this.transactionService.getMyTransactionsByDate(this.selectedUser,'withdrewAt[before]',this.depositAt,false).subscribe(
          (response: TransactionInterface[]) => {
            this.dataSource = response['hydra:member'];
            this.total = this.transactionService.calculateTotal(this.dataSource);
          }
        );
      }
    }

  }

  ngOnDestroy(): void {
    // this.transactionService.allTransactionsSubscription?.unsubscribe();
    // this.transactionService.myTransactionsSubscription?.unsubscribe();
  }
}
