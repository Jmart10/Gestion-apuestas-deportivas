import { Component, Input } from '@angular/core';
import { Bet } from '../../../../../core/models/bet.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-recent-bets',
  templateUrl: './recent-bets.component.html',
  styleUrls: ['./recent-bets.component.css'],
  imports: [CommonModule]
})
export class RecentBetsComponent {
  @Input() recentBets: Bet[] = [];
}
