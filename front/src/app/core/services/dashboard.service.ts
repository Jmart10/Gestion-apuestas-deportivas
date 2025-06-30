import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({ providedIn: 'root' })

export class DashboardService{
    private apiUrl = 'http://localhost:3001/api/dashboard';

    constructor(private http: HttpClient){}

    getUserStats(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<{ message: string, data: any }>(`${this.apiUrl}/${userId}`, {
        headers: {
        Authorization: `Bearer ${token}`
        }
    }).pipe(
        map(res => res.data)
    );
    }


    getPerformanceData(userId: string): Observable<{ performance: number[], labels: string[] }> {
    return this.http.get<{ data: { performance: number[], labels: string[] } }>(
        `${this.apiUrl}/performance/${userId}`
    ).pipe(map(res => res.data));
    }


}