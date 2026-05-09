import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../../features/auth/models/user.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private API = `${environment.apiUrl}/auth`;

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.API}/login`, { email, senha })
      .pipe(
        tap((response) => {

          localStorage.setItem('token', response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;

      return Date.now() > exp;
    } catch {
      return true;
    }
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');

    if (!token) return null;

    if (this.isTokenExpired(token)) {
      this.logout();
      return null;
    }

    return token;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  clientes() {
    this.router.navigate(['/clientes']);
  }

  equipamentos() {
    this.router.navigate(['/equipamentos']);
  }

  ordemServico() {
  this.router.navigate(['/ordens-servico']);
  }
}
