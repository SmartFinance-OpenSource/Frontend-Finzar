import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service.service";
import {Saving} from "../model/saving.entity";
import {catchError} from "rxjs";
import {SavingTransaction} from "../model/saving-transaction.entity";

@Injectable({
  providedIn: 'root'
})
export class SavingApiService extends BaseService<Saving> {
  resourceEndpoint: string = '/savings';

  //get savings by user id
  getSavingsByUserId(userId: any) {
    return this.http.get<Saving[]>(`${this.basePath}${this.resourceEndpoint}?userId=${userId}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getSavingById(savingId: number) {
    return this.http.get<Saving>(`${this.basePath}${this.resourceEndpoint}/${savingId}`, this.httpOptions)
        .pipe(catchError(this.handleError));
  }

  //create saving
  createSaving(saving: Saving) {
    return this.http.post<Saving>(`${this.basePath}${this.resourceEndpoint}`, saving, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //update saving
  updateSaving(saving: Saving) {
    return this.http.put<Saving>(`${this.basePath}${this.resourceEndpoint}`, saving, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getSavingsTransactionsBySavingId(savingId: number | undefined) {
    return this.http.get<SavingTransaction[]>(`${this.basePath}/savings_transactions?saving_id=${savingId}`, this.httpOptions)
        .pipe(catchError(this.handleError));
  }


}
