import { TestResponse } from './testResponse.interface';

export interface ResultatCandidat {
  id: string;
  testResponse: TestResponse;
  score: number;
  success: boolean;
  dateSoumission: string; // Date en string dans le JSON (ISO 8601)
}
