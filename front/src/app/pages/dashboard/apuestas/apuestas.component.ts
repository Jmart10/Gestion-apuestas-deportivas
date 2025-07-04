/*
import { Component, Input, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { Bet } from './models/bets.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-apuestas',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './apuestas.component.html',
  styleUrl: './apuestas.component.css'
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
  @Output() betSelected = new EventEmitter<Bet>();
  @Output() betPurchased = new EventEmitter<Bet>();

  selectedBet: Bet | null = null;
  filteredBets: Bet[] = [];
  leagues: string[] = ['La Liga', 'Premier League', 'Serie A', 'Bundesliga', 'Ligue 1'];
  selectedLeague = 'all';
  selectedType = 'all';

  ngOnInit() {
    this.filterBets();
  }

  filterBets() {
    this.filteredBets = this.bets.filter(bet => {
      const leagueMatch = this.selectedLeague === 'all' || bet.match.league === this.selectedLeague;
      const typeMatch = this.selectedType === 'all' || bet.forecast.type === this.selectedType;
      return leagueMatch && typeMatch;
    });
  }

  openBetDetails(bet: Bet) {
    this.selectedBet = bet;
  }

  closeModal() {
    this.selectedBet = null;
  }

  buyBet(bet: Bet) {
    this.betPurchased.emit(bet);
    this.closeModal();
  }

  getForecastType(type: string): string {
    switch(type) {
      case '1X2': return '1X2';
      case 'Over/Under': return 'Over/Under';
      case 'Handicap': return 'Handicap';
      default: return type;
    }
  }

  calculateExpectedValue(bet: Bet): number {
    // Lógica para calcular el valor esperado basado en estadísticas
    return bet.forecaster.stats.successRate * (bet.forecast.odds - 1) - (1 - bet.forecaster.stats.successRate);
  }
}
*/
