import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { RecentBetsComponent } from './components/recent-bets/recent-bets.component';
import { PerformanceChartComponent } from './components/performance-charts/performance-chart.component';
import { Bet } from '../../../core/models/bet.model';
import { DashboardService } from '../../../core/services/dashboard.service';

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
export class InicioComponent implements OnInit {
  userName = '';
  betsPlaced = 0;
  betsChange = 0;
  betsFollowed = 0;
  followedChange = 0;
  betsCreated = 0;
  createdChange = 0;
  hitRate = 0;
  hitRateChange = 0;
  recentBets: Bet[] = [];

  constructor(private dashboardService: DashboardService) {}

  performanceData: number[] = [];
  performanceLabels: string[] = [];

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.dashboardService.getUserStats(userId).subscribe(stats => {
        this.userName = stats.userName || '';
        this.betsPlaced = stats.betsPlaced || 0;
        this.betsChange = stats.betsChange || 0;
        this.betsFollowed = stats.betsFollowed || 0;
        this.followedChange = stats.followedChange || 0;
        this.betsCreated = stats.betsCreated || 0;
        this.createdChange = stats.createdChange || 0;
        this.hitRate = stats.hitRate || 0;
        this.hitRateChange = stats.hitRateChange || 0;
        this.recentBets = stats.recentBets || [];
      });
      this.dashboardService.getPerformanceData(userId).subscribe(res => {
        this.performanceData = res.performance;
        this.performanceLabels = res.labels;
      });
    }
  }
}

