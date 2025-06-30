import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../pages/dashboard/usuarios/models/user.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3001/api/users';

  constructor(private http: HttpClient) {}

getUsers(): Observable<User[]> {
  return this.http.get<{ message: string, users: any[] }>(this.apiUrl).pipe(
    map(res => res.users.map(u => ({
      ...u,
      id: u.id || u._id
    })))
  );
}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.put(`${this.apiUrl}/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
