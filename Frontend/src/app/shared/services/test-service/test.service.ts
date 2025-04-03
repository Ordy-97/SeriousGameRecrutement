import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../admin/auth-service/auth.service';
import { Test } from '../../interfaces/test.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  baseUrl = environment.apiUrl + '/tests';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  get header(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
  }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.baseUrl}`, { headers: this.header });
  }

  createTestWithQuestions(test: any) {
    return this.http.post(`${this.baseUrl}/createwithquestions`, test, {
      headers: this.header,
    });
  }
}
