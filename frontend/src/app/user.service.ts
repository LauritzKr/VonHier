import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient: HttpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:8080';

  public registerUser(newUser: User, password: string): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/register`, {
      ...newUser,
      password,
    });
  }
}
