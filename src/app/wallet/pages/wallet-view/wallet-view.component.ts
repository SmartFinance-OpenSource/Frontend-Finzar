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
  walletId: number;
  wallet: Wallet;
  cashflow!: any[];



  displayedColumns: string[] = [ 'id', 'walletId', 'amount', 'category_id', 'note', 'date', 'recurrent_id'];

  constructor( private earningApiService: EarningsApiService, private expensesApiService: ExpensesApiService, private route: ActivatedRoute, private walletApiService: WalletApiService) {
    this.earnings = this.expenses = [];
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
