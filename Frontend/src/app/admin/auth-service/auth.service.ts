import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  api_url = environment.apiUrl;

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.api_url}/login`, credentials).subscribe((res: any) => {
      localStorage.setItem('authToken', res.token);
      this.router.navigate(['/']);
    });
  }
}
