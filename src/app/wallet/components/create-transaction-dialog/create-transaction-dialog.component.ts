import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Transaction} from "../../../shared/model/transaction.entity";
import {Category} from "../../../shared/model/categories.entity";
import {CategoryApiService} from "../../../shared/services/category-api.service";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TransactionType} from "../../../shared/model/transaction-type.entity";
import {TransactionTypeApiService} from "../../../shared/services/transaction-type-api.service";
import {MatInput} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-create-transaction-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule, MatDatepickerModule, MatFormField, MatFormFieldModule, MatLabel, MatOption, MatSelect, NgForOf, FormsModule, MatInput, MatDatepickerInput, MatDatepickerToggle, MatDatepicker],
  templateUrl: './create-transaction-dialog.component.html',
  styleUrl: './create-transaction-dialog.component.css'
})
export class CreateTransactionDialogComponent {
  @Output() transactionCreated = new EventEmitter<Transaction>();
  newTransaction: Transaction;
  categories: Category[];
  transactionTypes: TransactionType[];

  constructor(private dialogRef: MatDialogRef<CreateTransactionDialogComponent>, private transactionTypeApiService: TransactionTypeApiService,private categoryApiService: CategoryApiService ) {
    this.newTransaction = new Transaction();
    this.categories = this.transactionTypes = []
  }

  ngOnInit() {
    const today = new Date();
    this.newTransaction.date = today.toISOString().split('T')[0];

    this.categoryApiService.getAllCategories().subscribe(
        (categories : Category[]) => {
          this.categories = categories;
        }
    );
    this.transactionTypeApiService.getAllTransactionTypes().subscribe(
        (transactionTypes : TransactionType[]) => {
          this.transactionTypes = transactionTypes;
        }
    );
  }

  onSubmit() {
    this.dialogRef.close(this.newTransaction)
  }

  onClose() {
    this.dialogRef.close(null);
  }
}
