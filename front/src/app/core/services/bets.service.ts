import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bet } from '../../pages/dashboard/apuestas/models/bets.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  private baseUrl = 'http://localhost:3001/api/bets';

  constructor(private http: HttpClient) {}

  getBets(userId: string): Observable<Bet[]> {
    return this.http.get<Bet[]>(`${this.baseUrl}?userId=${userId}`);
  }

  createBet(bet: Bet): Observable<Bet> {
    return this.http.post<Bet>(this.baseUrl, bet);
  }

  updateBet(id: string, bet: Bet): Observable<Bet> {
    return this.http.put<Bet>(`${this.baseUrl}/${id}`, bet);
  }

  deleteBet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
