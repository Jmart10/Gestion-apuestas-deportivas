import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { RecentBetsComponent } from './components/recent-bets/recent-bets.component';
import { PerformanceChartComponent } from './components/performance-charts/performance-chart.component';
import { Bet } from '../../../core/models/bet.model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  imports: [
    CommonModule,
    MetricCardComponent,
    RecentBetsComponent,
    PerformanceChartComponent
  ]
})
export class InicioComponent {
  userName = 'Alex Fernández';

  betsPlaced = 42;
  betsChange = 12.5;
  betsFollowed = 18;
  followedChange = -3.2;
  betsCreated = 7;
  createdChange = 25;
  hitRate = 68.3;
  hitRateChange = 4.2;

  recentBets: Bet[] = [
    { title: 'Junior Vs Medellín', date: new Date(), result: 'won', amount: 2.16 },
    { title: 'Colombia Vs Argentina', date: new Date(Date.now() - 86400000), result: 'lost', amount: 2.10 },
    { title: 'Brasil Vs Paraguay', date: new Date(Date.now() - 172800000), result: 'pending', amount: 2.00 },
    { title: 'Millonarios Vs Nacional', date: new Date(Date.now() - 259200000), result: 'won', amount: 1.80 },
    { title: 'América Vs Tolima', date: new Date(Date.now() - 345600000), result: 'lost', amount: 2.50 }
  ];
}
