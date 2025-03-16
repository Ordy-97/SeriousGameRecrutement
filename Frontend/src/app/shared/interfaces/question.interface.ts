import { Answer } from "./answer.interface";
import { QuestionType } from "./questionType.enum";

export interface Question {
  id: string;
  name: string;
  questionType: QuestionType;
  answers?: Answer[];        
  correctAnswerId?: string;  
}