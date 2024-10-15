import { Injectable } from '@angular/core';
import {BaseService} from "./base.service.service";
import {Transaction} from "../model/transaction.entity";
import {catchError} from "rxjs";

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

}
