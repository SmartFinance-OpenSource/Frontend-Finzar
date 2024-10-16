import { Injectable } from '@angular/core';
import {BaseService} from "./base.service.service";
import {Transaction} from "../model/transaction.entity";
import {catchError} from "rxjs";
import {Saving} from "../../savings/model/saving.entity";

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService extends BaseService<Transaction> {

  resourceEndpoint: string = '/transactions';

  //get transactions by user id
  getTransactionsByUserId(userId: any) {
    return this.http.get<Transaction[]>(`${this.basePath}${this.resourceEndpoint}?userId=${userId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getTransactionsByWalletId(walletId: any) {
    return this.http.get<Transaction[]>(`${this.basePath}${this.resourceEndpoint}?walletId=${walletId}`, this.httpOptions)
        .pipe(catchError(this.handleError));
  }

  createTransaction(transaction: Transaction) {
    return this.http.post<Saving>(`${this.basePath}${this.resourceEndpoint}`, transaction, this.httpOptions)
        .pipe(catchError(this.handleError));
  }

}
