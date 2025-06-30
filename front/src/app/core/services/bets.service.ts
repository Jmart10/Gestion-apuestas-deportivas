import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bet } from '../../pages/dashboard/apuestas/models/bets.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  private baseUrl = 'http://localhost:3001/api/bets';

  constructor(private http: HttpClient) {}

  getBets(userId: string): Observable<Bet[]> {
    return this.http.get<Bet[]>(`${this.baseUrl}?userId=${userId}`).pipe(
      map(bets => bets.map(b => ({ ...b, id: b.id || (b as any)._id })))
    );
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

  getAllBets(): Observable<Bet[]> {
    return this.http.get<Bet[]>('http://localhost:3001/api/bets/all')
      .pipe(map(bets => bets.map(b => ({ ...b, id: b.id || (b as any)._id }))));
  }

}
