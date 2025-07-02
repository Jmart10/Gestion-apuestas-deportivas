import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Forecaster } from '../models/forecaster.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ForecastersService {
  private apiUrl = 'http://localhost:3001/api/forecasters';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Forecaster[]> {
    return this.http.get<Forecaster[]>(this.apiUrl);
  }

  create(forecaster: Forecaster): Observable<Forecaster> {
    return this.http.post<Forecaster>(this.apiUrl, forecaster);
  }

  update(id: string, forecaster: Forecaster): Observable<Forecaster> {
    return this.http.put<Forecaster>(`${this.apiUrl}/${id}`, forecaster);
  }

  toggleStatus(id: string): Observable<Forecaster> {
    return this.http.patch<Forecaster>(`${this.apiUrl}/${id}/toggle-status`, {});
  }
}
