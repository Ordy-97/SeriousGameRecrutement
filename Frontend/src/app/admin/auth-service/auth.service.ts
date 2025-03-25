import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  api_url = environment.apiUrl;

  private TOKEN_KEY = 'token';
  private EXPIRATION_KEY = 'tokenExpiration';
  private EXPIRATION_TIME = 10 * 60 * 1000;

  login(credentials: { name: string; password: string }) {
    console.log(credentials);
    return this.http
      .post<{ token: string }>(`${this.api_url}/login`, credentials)
      .subscribe(
        (res) => {
          console.log(res);
          this.saveToken(res.token);
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Erreur de connexion', error);
        },
      );
  }

  saveToken(token: string) {
    const expirationTime = Date.now() + this.EXPIRATION_TIME;
    sessionStorage.setItem(this.TOKEN_KEY, token);
    sessionStorage.setItem(this.EXPIRATION_KEY, expirationTime.toString());

    setTimeout(() => {
      this.removeToken();
      console.log('Token expired');
    }, this.EXPIRATION_TIME);
  }

  getToken() {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    const expiration = sessionStorage.getItem(this.EXPIRATION_KEY);

    if (token && expiration) {
      const now = Date.now();
      if (now < Number(expiration)) {
        return token;
      } else {
        this.removeToken();
      }
    }
    return null;
  }

  removeToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.EXPIRATION_KEY);
  }

  logout() {
    this.removeToken();
    this.router.navigate(['/admin/login']);
  }
}
