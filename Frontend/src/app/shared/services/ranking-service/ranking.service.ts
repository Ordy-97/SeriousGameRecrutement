import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultatCandidat } from '../../interfaces/resultatCandiat.interface';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRanking(): Observable<ResultatCandidat> {
    return this.http.get<ResultatCandidat>(`${this.baseUrl}/ranking`);
  }
}
