import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {BalanceDisplayComponent} from "../../components/balance-display/balance-display.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {EarningsApiService} from "../../services/earnings-api.service";
import {ExpensesApiService} from "../../services/expenses-api.service";
import {Earning} from "../../model/earning.entity";
import {Expense} from "../../model/expense.entity";
import {NgForOf} from "@angular/common";
import {WalletItemComponent} from "../../components/wallet-item/wallet-item.component";
import {ActivatedRoute} from "@angular/router";
import {Wallet} from "../../model/wallet.entity";
import {WalletApiService} from "../../../shared/services/wallet-api.service";
import {Transaction} from "../../../shared/model/transaction.entity";
import {TransactionApiService} from "../../../shared/services/transaction-api.service";
import {MatDialog} from "@angular/material/dialog";
import {
  CreateTransactionDialogComponent
} from "../../components/create-transaction-dialog/create-transaction-dialog.component";

@Component({
  selector: 'app-wallet-view',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, MatTableModule, BalanceDisplayComponent,
    MatCheckboxModule, NgForOf, WalletItemComponent, MatTableModule],
  templateUrl: './wallet-view.component.html',
  styleUrl: './wallet-view.component.css'
})
export class WalletViewComponent {

  earnings: Earning[];
  expenses: Expense[];
  transactions: Transaction[];
  walletId: number;
  wallet: Wallet;
  cashflow!: any[];

  displayedColumns: string[] = [ 'id', 'walletId', 'amount', 'category_id', 'note', 'date', 'recurrent_id'];
  displayedTransactionColumns: string[] = ['id', 'transaction_type_id', 'walletId', 'amount', 'date', 'note', 'category_id']

  constructor(private earningApiService: EarningsApiService, private expensesApiService: ExpensesApiService, private transactionsApiService: TransactionApiService, private route: ActivatedRoute, private walletApiService: WalletApiService, public dialog: MatDialog) {
    this.earnings = this.expenses = this.transactions = [];
    this.walletId = 0;
    this.wallet = new Wallet();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.walletId = params['id'];});

    this.walletApiService.getWalletById(this.walletId).subscribe(wallet => {
      this.wallet = wallet;
    });

    this.earningApiService.getEarningsByWalletId(this.walletId).subscribe(earnings => {
      this.earnings = earnings;
    });
    this.expensesApiService.getExpensesByWalletId(this.walletId).subscribe(expenses => {
      this.expenses = expenses;
    });
    this.transactionsApiService.getTransactionsByWalletId(this.walletId).subscribe(transactions => {
      this.transactions = transactions;
    })

    this.cashflow = this.expenses.concat(this.earnings);
  }

  onCreateTransaction() {
    const dialogRef = this.dialog.open(CreateTransactionDialogComponent, {
      hasBackdrop: true,
      maxWidth: '1200px',
      width: '100%',
      data: { walletId: this.walletId }
    });

    dialogRef.afterClosed().subscribe((transaction: Transaction) => {
      if (transaction) {
        this.transactionsApiService.createTransaction(transaction).subscribe(() => {
          this.transactionsApiService.getTransactionsByWalletId(this.walletId).subscribe(transactions => {
            this.transactions = transactions;
          });
        });
      }
    })

  }

  titles = [
    'Total Balance',
    'Total Period Change',
    'Total Period Expenses',
    'Total Period Income',
    'Period Income',
    'Period Expenses'
  ];

  balances = [
    2000,
    -123,
    4000,
    345
  ];


}
