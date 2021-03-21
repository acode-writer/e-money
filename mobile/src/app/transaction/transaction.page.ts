import {Component, OnDestroy, OnInit} from '@angular/core';
import {InterfaceService} from "../services/interface/interface.service";
import {UserInterface} from "../models/user.interface";
import {TransactionService} from "../services/transaction/transaction.service";
import {TransactionInterface} from "../models/transaction.interface";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit, OnDestroy {
  private role = 'ROLE_ADMIN_AGENCE';
  public displayedColumns: string[] = ['date', 'utilisateur', 'type', 'montant', 'frais'];
  public dataSource: TransactionInterface[];
  public total : number;
  constructor(public interfaceService: InterfaceService, private transactionService: TransactionService) { }

  async ngOnInit() {
    await this.interfaceService.getConnectedUser();
    await this.onGetMyTransaction();
  }
  async onGetMyTransaction() {
    await this.interfaceService.connectedUser.subscribe(
      (user: UserInterface) => {
        if (user){
          const userId = user.id;
          this.getMyTransactions(userId);
        }
      }
    );
  }
  async onGetAllTransactions() {
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
    this.transactionService.myTransactionsSubscription = this.transactionService.getMyTransactions(userId).subscribe(
      transaction => {
        this.transactionService.myTransactions = transaction['hydra:member'];
        this.dataSource = this.transactionService.myTransactions;
        this.total = this.transactionService.calculateTotal(this.dataSource);
      }
    );
  }

  ngOnDestroy(): void {
    // this.transactionService.allTransactionsSubscription?.unsubscribe();
    // this.transactionService.myTransactionsSubscription?.unsubscribe();
  }
}
