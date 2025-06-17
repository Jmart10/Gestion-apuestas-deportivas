import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BetDialogComponent } from '../bet-dialog/bet-dialog,component';
import { Bet } from '../../models/bets.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.css'],
    imports: [
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        CommonModule
    ]
})
export class BetsListComponent {
  bets: Bet[] = [
    {
      id: '1',
      match: {
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        date: new Date('2023-12-10T20:45:00'),
        league: 'La Liga',
        history: {
          lastMatches: [
            { teams: 'RMA vs BAR', result: '2-1', date: new Date('2023-04-05') },
            { teams: 'BAR vs RMA', result: '3-2', date: new Date('2023-01-15') },
            { teams: 'RMA vs BAR', result: '1-1', date: new Date('2022-10-16') }
          ],
          h2h: {
            homeWins: 5,
            awayWins: 3,
            draws: 2
          }
        }
      },
      forecast: {
        type: '1X2',
        selection: '1 (Local)',
        odds: 2.10
      },
      forecaster: {
        id: '101',
        name: 'Juan Pérez',
        avatar: 'assets/avatars/juan-perez.jpg',
        stats: {
          successRate: 0.68,
          last10: [1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
          yield: 0.25
        }
      },
      price: 9.99,
      createdAt: new Date()
    },
    {
      id: '2',
      match: {
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        date: new Date('2023-12-12T19:30:00'),
        league: 'Premier League',
        history: {
          lastMatches: [
            { teams: 'MUN vs LIV', result: '0-5', date: new Date('2023-03-05') },
            { teams: 'LIV vs MUN', result: '4-0', date: new Date('2022-08-22') }
          ],
          h2h: {
            homeWins: 2,
            awayWins: 7,
            draws: 1
          }
        }
      },
      forecast: {
        type: 'Over/Under',
        selection: 'Over 2.5 goles',
        odds: 1.85
      },
      forecaster: {
        id: '102',
        name: 'Ana Gómez',
        avatar: 'assets/avatars/ana-gomez.jpg',
        stats: {
          successRate: 0.72,
          last10: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
          yield: 0.31
        }
      },
      price: 12.50,
      createdAt: new Date()
    },
    {
      id: '3',
      match: {
        homeTeam: 'Bayern Munich',
        awayTeam: 'Borussia Dortmund',
        date: new Date('2023-12-13T20:00:00'),
        league: 'Bundesliga',
        history: {
          lastMatches: [
            { teams: 'BAY vs DOR', result: '4-2', date: new Date('2023-04-01') },
            { teams: 'DOR vs BAY', result: '2-2', date: new Date('2022-10-08') }
          ],
          h2h: {
            homeWins: 8,
            awayWins: 2,
            draws: 0
          }
        }
      },
      forecast: {
        type: 'Handicap',
        selection: 'Bayern -1.5',
        odds: 2.40
      },
      forecaster: {
        id: '103',
        name: 'Carlos Ruiz',
        avatar: 'assets/avatars/carlos-ruiz.jpg',
        stats: {
          successRate: 0.65,
          last10: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
          yield: 0.18
        }
      },
      price: 15.00,
      createdAt: new Date()
    }
  ];
  filteredBets: Bet[] = [];
    ngOnInit() {
    this.filteredBets = [...this.bets]; // Inicializa con los datos de prueba
  }
  
  constructor(private dialog: MatDialog) {}

  openAddBetDialog(): void {
    const dialogRef = this.dialog.open(BetDialogComponent, {
      width: '800px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(newBet => {
      if (newBet) {
        this.bets.unshift(newBet);
        this.filteredBets = [...this.bets];
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
        const index = this.bets.findIndex(b => b.id === updatedBet.id);
        if (index !== -1) {
          this.bets[index] = updatedBet;
          this.filteredBets = [...this.bets];
        }
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
        this.bets = this.bets.filter(bet => bet.id !== betId);
        this.filterBets();
      }
    });
  }

  private filterBets(): void {
    this.filteredBets = [...this.bets];
  }
}