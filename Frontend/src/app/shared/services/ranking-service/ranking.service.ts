import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultatCandidat } from '../../interfaces/resultatCandiat.interface';
import { AuthService } from '../../../admin/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  baseUrl = environment.apiUrl + '/test';

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

  getRanking(): Observable<ResultatCandidat[]> {
    return this.http.get<ResultatCandidat[]>(`${this.baseUrl}/allSubmit`, {
      headers: this.header,
    });
  }
}
