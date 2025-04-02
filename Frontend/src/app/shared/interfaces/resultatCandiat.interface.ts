import { Candidat } from './candidat.interface';
import { Test } from './test.interface';
import { TestResponse } from './testResponse.interface';

export interface ResultatCandidat {
  id: string;
  candidat: Candidat;
  test: Test;
  multipleChoiceAnswers: { [questionId: string]: string }; // clé = ID question, valeur = ID réponse
  openAnswers: { [questionId: string]: string }; // clé = ID question, valeur = réponse libre
  score: number;
  dateSoumission: string; // Date en string dans le JSON (ISO 8601)
}
