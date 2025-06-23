import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Bet } from '../../models/bets.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

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
    ReactiveFormsModule,
    MatDivider,
    MatCardModule
  ],
})
export class BetDialogComponent implements OnInit {
  betForm: FormGroup;
  leagues = ['La Liga', 'Premier League', 'Serie A', 'Bundesliga', 'Ligue 1'];
  forecasters = [
    { id: '1', name: 'Pronosticador 1' },
    { id: '2', name: 'Pronosticador 2' }
  ];
  status = ['Ganada', 'Perdida', 'Pendiente', 'Cancelada', 'Anulada'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bet?: Bet, isEdit: boolean }
  ) {
    this.betForm = this.fb.group({
      bets: this.fb.array([]),
      price: [null, [Validators.required, Validators.min(0)]],
      forecasterId: ['', Validators.required]
    });
    if (!this.data.isEdit) {
      this.addBet();
    }
  }

ngOnInit(): void {
  if (this.data.isEdit && this.data.bet) {
    this.data.bet.matches.forEach(match => {
      this.addBet({
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        league: match.league,
        matchDate: new Date(match.date),
        odds: match.forecast.odds,
        forecastSelection: match.forecast.selection
      });
    });

    this.betForm.patchValue({
      price: this.data.bet.price,
      forecasterId: this.data.bet.forecaster.id
    });
  }
}
    get bets(): FormArray {
    return this.betForm.get('bets') as FormArray;
  }



    addBet(betData?: any): void {
    this.bets.push(this.fb.group({
      homeTeam: [betData?.homeTeam || '', Validators.required],
      awayTeam: [betData?.awayTeam || '', Validators.required],
      league: [betData?.league || '', Validators.required],
      matchDate: [betData?.matchDate || '', Validators.required],
      odds: [betData?.odds || null, [Validators.required, Validators.min(1)]],
      forecastSelection: [betData?.forecastSelection || '', Validators.required],
      status: [betData?.status || 'Pendiente', Validators.required]
    }));
  }

      removeBet(index: number): void {
    this.bets.removeAt(index);
  }

onSubmit(): void {
  if (this.betForm.valid) {
    const formValue = this.betForm.value;
    const forecaster = this.forecasters.find(f => f.id === formValue.forecasterId);

    const matches = formValue.bets.map((b: any) => ({
      homeTeam: b.homeTeam,
      awayTeam: b.awayTeam,
      date: b.matchDate,
      league: b.league,
      status: b.status,
      history: {
        lastMatches: [],
        h2h: { homeWins: 0, awayWins: 0, draws: 0 }
      },
      forecast: {
        type: '1X2',
        selection: b.forecastSelection,
        odds: b.odds
      }
    }));

    const bet: Bet = {
      id: this.data.isEdit && this.data.bet ? this.data.bet.id || this.data.bet._id : this.generateId(),
      matches,
      price: formValue.price,
      createdAt: this.data.isEdit && this.data.bet ? this.data.bet.createdAt : new Date(),
      forecaster: {
        id: formValue.forecasterId,
        name: forecaster?.name || 'Anónimo',
        avatar: this.data.isEdit && this.data.bet ? this.data.bet.forecaster.avatar : '',
        stats: this.data.isEdit && this.data.bet ? this.data.bet.forecaster.stats : {
          successRate: 0.5,
          last10: Array(10).fill(0),
          yield: 0
        }
      }
    };

    this.dialogRef.close(bet); // Ahora se envía un solo objeto Bet con múltiples partidos
  }
}
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}