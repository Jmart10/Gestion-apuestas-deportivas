import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bet } from '../../dashboard/apuestas/models/bets.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { BetDetailsDialogComponent } from './components/bet-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BetsService } from '../../../core/services/bets.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-historial',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class BetHistoryComponent {
  
  filtersForm: FormGroup;
  filteredBets: Bet[] = [];
  uniqueForecasters: string[] = [];
    bets: Bet[] = [];
    userId: string = '';


  constructor(private dialog: MatDialog, private betService: BetsService, private fb: FormBuilder) {
    this.filtersForm = this.fb.group({
    forecaster: [''],
    status: [''],
    sort: [''],
    onlyMine: [false]
  });
  }



ngOnInit() {
  this.userId = localStorage.getItem('userId') || '';
  this.betService.getAllBets().subscribe({
    next: (bets: Bet[]) => {
      this.bets = bets;

      this.uniqueForecasters = [
        ...new Set(bets.map(b => b.forecaster.name))
      ];

      this.filteredBets = [...bets];
    },
    error: (err) => {
      console.error('Error cargando apuestas', err);
    }
  });
}


  applyFilters() {
  const { forecaster, status, sort } = this.filtersForm.value;

  this.filteredBets = this.bets.filter(bet => {
    const matchesForecaster = !forecaster || bet.forecaster.name === forecaster;
    const matchesStatus = !status || this.getBetStatus(bet) === status;
    const matchesUser = !this.filtersForm.value.onlyMine || bet.userId === this.userId;

    return matchesForecaster && matchesStatus && matchesUser;
  });

  if (sort) {
    switch (sort) {
      case 'price':
        this.filteredBets.sort((a, b) => b.price - a.price);
        break;
      case 'odds':
        this.filteredBets.sort((a, b) => {
          const avgA = this.averageOdds(a);
          const avgB = this.averageOdds(b);
          return avgB - avgA;
        });
        break;
      case 'date':
        this.filteredBets.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }
  }
}

averageOdds(bet: Bet): number {
  const totalOdds = bet.matches.reduce((sum, match) => sum + (match.forecast.odds || 0), 0);
  return bet.matches.length ? totalOdds / bet.matches.length : 0;
}

  openDetails(bet: Bet): void {
    this.dialog.open(BetDetailsDialogComponent, {
      data: { bet },
      width: '600px'
    });
  }

  countByStatus(status: string): number {
    return this.bets.filter(bet => bet.status === status).length;
  }




capitalize(str?: string): string {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  getBetStatus(bet: Bet): string {
    return this.capitalize(bet.status);
  }


  getStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'ganada': return 'status-ganada';
    case 'perdida': return 'status-perdida';
    case 'pendiente': return 'status-pendiente';
    case 'cancelada': return 'status-cancelada';
    case 'anulada': return 'status-anulada';
    default: return '';
  }
}


}
