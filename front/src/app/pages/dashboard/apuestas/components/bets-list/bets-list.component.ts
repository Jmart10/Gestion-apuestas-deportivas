import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BetDialogComponent } from '../bet-dialog/bet-dialog,component';
import { Bet } from '../../models/bets.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BetsService } from '../..//../../../core/services/bets.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-bets-list',
  standalone: true,
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.css'],
    imports: [
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        CommonModule,
        MatDividerModule
    ]
})
export class BetsListComponent implements OnInit {
  bets: Bet[] = [];
  filteredBets: Bet[] = [];
  userId = localStorage.getItem('userId') || '';
  constructor(private dialog: MatDialog, private betsService: BetsService) {}

  ngOnInit() {
    this.loadBets();
  }

  loadBets() {
    this.betsService.getBets(this.userId).subscribe(bets => {
      this.bets = bets.map(b => ({
        ...b,
        id: b.id || (b as any)._id // Normaliza el id si solo llega _id
      }));
      this.filteredBets = [...this.bets];
    });
  }

  openAddBetDialog(): void {
    const dialogRef = this.dialog.open(BetDialogComponent, {
      width: '800px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(newBet => {
      if (newBet) {
        newBet.userId = this.userId;
        this.betsService.createBet(newBet).subscribe(created => {
          this.bets.unshift(created);
          this.filteredBets = [...this.bets];
        });
      }
    });
  }

  openEditBetDialog(bet: Bet): void {
    const dialogRef = this.dialog.open(BetDialogComponent, {
      width: '800px',
      data: { bet, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(updatedBet => {
      if (updatedBet) {
        this.betsService.updateBet(updatedBet.id, updatedBet).subscribe(updated => {
          const index = this.bets.findIndex(b => b.id === updated.id);
          if (index !== -1) {
            this.bets[index] = updated;
            this.filteredBets = [...this.bets];
            this.bets[index] = { ...updated, id: updated.id || updated._id };
          }
          this.filteredBets = [...this.bets];
        });
      }
    });
  }

  deleteBet(betId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Apuesta',
        message: '¿Estás seguro de eliminar esta apuesta?',
        confirmText: 'Eliminar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.betsService.deleteBet(betId).subscribe(() => {
          this.bets = this.bets.filter(bet => bet.id !== betId);
          this.filteredBets = [...this.bets];
        });
      }
    });
  }
  get pendingBets(): Bet[] {
    return this.filteredBets.filter(bet => bet.status === 'pendiente');
  }
}