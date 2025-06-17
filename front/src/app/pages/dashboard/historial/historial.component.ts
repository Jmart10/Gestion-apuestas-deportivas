import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetHistory } from './models/bet-history.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-historial',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class BetHistoryComponent {
  bets: BetHistory[] = [
    {
      id: '1',
      match: {
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        score: '2-1',
        date: new Date('2023-11-05'),
        league: 'La Liga'
      },
      forecast: {
        type: '1X2',
        selection: '1 (Local)',
        odds: 2.10,
        result: 'won'
      },
      forecaster: {
        id: '101',
        name: 'Juan Pérez',
        avatar: 'assets/avatars/juan-perez.jpg'
      },
      followers: 42,
      createdAt: new Date('2023-11-04'),
      settledAt: new Date('2023-11-06')
    },
    {
      id: '2',
      match: {
        homeTeam: 'Manchester City',
        awayTeam: 'Liverpool',
        score: '1-1',
        date: new Date('2023-11-12'),
        league: 'Premier League'
      },
      forecast: {
        type: 'Over/Under',
        selection: 'Under 2.5',
        odds: 1.85,
        result: 'lost'
      },
      forecaster: {
        id: '102',
        name: 'Ana Gómez',
        avatar: 'assets/avatars/ana-gomez.jpg'
      },
      followers: 28,
      createdAt: new Date('2023-11-10'),
      settledAt: new Date('2023-11-13')
    },
    {
      id: '3',
      match: {
        homeTeam: 'Bayern Munich',
        awayTeam: 'Dortmund',
        score: '3-2',
        date: new Date('2023-11-18'),
        league: 'Bundesliga'
      },
      forecast: {
        type: 'Handicap',
        selection: 'Bayern -1.5',
        odds: 2.40,
        result: 'won'
      },
      forecaster: {
        id: '103',
        name: 'Carlos Ruiz',
        avatar: 'assets/avatars/carlos-ruiz.jpg'
      },
      followers: 35,
      createdAt: new Date('2023-11-16'),
      settledAt: new Date('2023-11-19')
    },
    {
      id: '4',
      match: {
        homeTeam: 'PSG',
        awayTeam: 'Marseille',
        score: '2-1',
        date: new Date('2023-11-26'),
        league: 'Ligue 1'
      },
      forecast: {
        type: '1X2',
        selection: '1 (Local)',
        odds: 1.75,
        result: 'pending'
      },
      forecaster: {
        id: '104',
        name: 'Lucía Martín',
        avatar: 'assets/avatars/lucia-martin.jpg'
      },
      followers: 19,
      createdAt: new Date('2023-11-24')
    }
  ];

  filteredBets: BetHistory[] = [];
  selectedResult: string = 'all';
  sortBy: string = 'newest';

  ngOnInit() {
    this.filterBets();
  }

  filterBets() {
    this.filteredBets = this.bets.filter(bet => {
      if (this.selectedResult === 'all') return true;
      return bet.forecast.result === this.selectedResult;
    });
    this.sortBets();
  }

  sortBets() {
    this.filteredBets.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'highest-odds':
          return b.forecast.odds - a.forecast.odds;
        case 'most-followers':
          return b.followers - a.followers;
        default:
          return 0;
      }
    });
  }

  getResultText(result: string): string {
    switch (result) {
      case 'won': return 'Ganada';
      case 'lost': return 'Perdida';
      case 'pending': return 'Pendiente';
      default: return '';
    }
  }
}
