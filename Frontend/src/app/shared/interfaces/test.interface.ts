import { Question } from './question.interface';
import { User } from './user.interface';

export interface Test {
  id: string;
  name: string;
  createdAt: string; // ISO date string en JSON
  description?: string;
  questions?: Question[];
  createdBy?: User;
}
