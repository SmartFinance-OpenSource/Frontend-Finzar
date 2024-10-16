import { Component, OnInit } from '@angular/core';
import {BalancePiechartComponent} from "../../../wallet/components/balance-piechart/balance-piechart.component";
import {MatCardModule} from "@angular/material/card";
import {BalanceDisplayComponent} from "../../../wallet/components/balance-display/balance-display.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute} from "@angular/router";
import {SavingApiService} from "../../services/saving-api.service";
import {Saving} from "../../model/saving.entity";
import {HttpClient} from "@angular/common/http";
import {SavingTransaction} from "../../model/saving-transaction.entity";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatProgressBar} from "@angular/material/progress-bar";
import {DatePipe, NgIf} from "@angular/common";


@Component({
  selector: 'app-savings-detail',
  standalone: true,
  templateUrl: './savings-detail.component.html',
  styleUrls: ['./savings-detail.component.css'],
  imports: [
    BalancePiechartComponent,
    MatCardModule,
    BalanceDisplayComponent,
    MatIconButton,
    MatIcon,
    MatButton,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef,
    MatProgressBar,
    NgIf,
    DatePipe
  ],
  templateUrl: './savings-detail.component.html',
  styleUrl: './savings-detail.component.css'
})
export class SavingsDetailComponent implements OnInit {
  titles = [
    'Savings Goal',
    'Saved so far',
    'Money to save',
    'You need to save',
    'Period Income',
    'Period Expenses',
    'Saving asdf'
  ];

  balances = [
    2000,
    -123,
    4000,
    345
  ];

  saving: Saving | undefined;  // Variable para almacenar el ahorro cargado
  savingId: number | undefined; // ID del ahorro obtenido de la URL

  savingTransactions: SavingTransaction[] = [];

  showAll: boolean = false; // Variable para controlar la visibilidad

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private savingApiService: SavingApiService
  ) {}


  ngOnInit() {
    // Obtener el id de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.savingId = Number(id);  // Convertir el id a número
      this.loadSaving();  // Cargar los detalles del ahorro
    }
    this.loadSavingTransactions();

  }

  loadSavingTransactions(): void {
    this.savingApiService.getSavingsTransactionsBySavingId(this.savingId).subscribe(
        (data: SavingTransaction[]) => {
          this.savingTransactions = data;
        },
        error => {
          console.error('Error al cargar las transacciones de ahorro', error);
        }
    );
  }


  loadSaving() {
    if (this.savingId) {
      // Llamada al servicio para obtener el ahorro por ID
      this.savingApiService.getSavingById(this.savingId).subscribe(
          (data: Saving) => {
            this.saving = data;  // Asignar el ahorro obtenido
          },
          error => {
            console.error('Error al cargar el ahorro', error);  // Manejo de errores
          }
      );
    }
  }


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed the deletion
        this.deleteSavingFromDb(this.currentSavingId);
      }
    });
  }

  private deleteSavingFromDb(savingId: number): void {
    this.http.delete(`http://localhost:3000/savings/${savingId}`).subscribe(
        () => {
          console.log('Saving deleted successfully');
        },
        error => {
          console.error('Error deleting saving', error);
        }
    );
  }
}
