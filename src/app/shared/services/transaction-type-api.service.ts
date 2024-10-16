import { Injectable } from '@angular/core';
import {BaseService} from "./base.service.service";
import {catchError, Observable} from "rxjs";
import {TransactionType} from "../model/transaction-type.entity";

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeApiService extends BaseService<TransactionType>{
  resourceEndpoint: string = '/transaction_types';

  // Get all Transaction Types
  getAllTransactionTypes(): Observable<TransactionType[]> {
    return this.http.get<TransactionType[]>(`${this.basePath}${this.resourceEndpoint}`, this.httpOptions)
        .pipe(catchError(this.handleError));
  }

}