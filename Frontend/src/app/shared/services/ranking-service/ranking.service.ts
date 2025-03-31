import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultatCandidat } from '../../interfaces/resultatCandiat.interface';
import { AuthService } from '../../../admin/auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  get header() {
    return {
      Authorization: `Bearer ${this.authService.getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  getRanking(): Observable<ResultatCandidat> {
    return this.http.get<ResultatCandidat>(`${this.baseUrl}/ranking`);
  }
}
