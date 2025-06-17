import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Bet } from '../../models/bets.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bet-dialog',
  templateUrl: './bet-dialog.component.html',
  styleUrls: ['./bet-dialog.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
})
export class BetDialogComponent implements OnInit {
  betForm: FormGroup;
  leagues = ['La Liga', 'Premier League', 'Serie A', 'Bundesliga', 'Ligue 1'];
  forecasters = [
    { id: '1', name: 'Pronosticador 1' },
    { id: '2', name: 'Pronosticador 2' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bet?: Bet, isEdit: boolean }
  ) {
    this.betForm = this.fb.group({
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
      league: ['', Validators.required],
      matchDate: ['', Validators.required],
      odds: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]],
      forecasterId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.isEdit && this.data.bet) {
      this.betForm.patchValue({
        homeTeam: this.data.bet.match.homeTeam,
        awayTeam: this.data.bet.match.awayTeam,
        league: this.data.bet.match.league,
        matchDate: this.data.bet.match.date,
        odds: this.data.bet.forecast.odds,
        price: this.data.bet.price,
        forecasterId: this.data.bet.forecaster.id
      });
    }
  }

    onSubmit(): void {
    if (this.betForm.valid) {
        const formValue = this.betForm.value;
        const bet: Bet = {
        id: this.data.isEdit && this.data.bet ? this.data.bet.id : this.generateId(),
        match: {
            homeTeam: formValue.homeTeam,
            awayTeam: formValue.awayTeam,
            date: formValue.matchDate,
            league: formValue.league,
            history: this.data.isEdit && this.data.bet ? this.data.bet.match.history : {
            lastMatches: [],
            h2h: { homeWins: 0, awayWins: 0, draws: 0 }
            }
        },
        forecast: {
            type: '1X2',
            selection: '1 (Local)',
            odds: formValue.odds
        },
        forecaster: {
            id: formValue.forecasterId,
            name: this.forecasters.find(f => f.id === formValue.forecasterId)?.name || 'Anónimo',
            avatar: this.data.isEdit && this.data.bet ? this.data.bet.forecaster.avatar : undefined,
            stats: this.data.isEdit && this.data.bet ? this.data.bet.forecaster.stats : {
            successRate: 0.5, // Valor por defecto
            last10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Array vacío
            yield: 0 // Valor inicial
            }
        },
        price: formValue.price,
        createdAt: this.data.isEdit && this.data.bet ? this.data.bet.createdAt : new Date()
        };
        
        this.dialogRef.close(bet);
    }
    }
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}