import { Candidat } from './candidat.interface';
import { Test } from './test.interface';

export interface TestResponse {
  id: string;
  candidat: Candidat;
  test: Test;
  multipleChoiceAnswers: { [questionId: string]: string }; // clé = ID question, valeur = ID réponse
  openAnswers: { [questionId: string]: string }; // clé = ID question, valeur = réponse libre
}
