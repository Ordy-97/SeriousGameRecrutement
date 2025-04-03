import { Question } from './../../interfaces/question.interface';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QuestionType } from '../../interfaces/questionType.enum';
import { Test } from '../../interfaces/test.interface';
import { MatDialog } from '@angular/material/dialog';
import { CandidatModalComponent } from '../../../candidat/candidat-modal/candidat-modal.component';

  
@Component({
  selector: 'app-test-response',
  templateUrl: './testResponse.component.html',
  styleUrls: ['./testResponse.component.css'],
  imports: [NgIf,NgFor,FormsModule ]
})
export class TestResponseComponent implements OnInit {
  QuestionType = QuestionType;

  currentQuestionIndex = 0;
  test?: Test;
  questions: Question[] = [];

  responses: { [key: string]: string | null } = {};
  
  constructor(private dialog: MatDialog) {}

//ouvrir la modale
openCandidatModal(): void {
  this.dialog.open(CandidatModalComponent, {
    width: '500px',
    disableClose: false,
    autoFocus: true,
    panelClass: 'custom-modal'
  });
}
  ngOnInit(): void {
    // test statique
    this.test = {
      id: '1',
      name: 'Test Démo Statique',
      createdAt: new Date().toISOString(),
      description: 'Un test statique pour démo UI',
      questions: [
        {
          id: 'q1',
          name: 'Quel est ton framework frontend préféré ?',
          questionType: QuestionType.MULTIPLE_CHOICE,
          answers: [
            { id: '1', text: 'Angular' },
            { id: '2', text: 'React' },
            { id: '3', text: 'Vue' },
          ]
        },
        {
          id: 'q2',
          name: 'Pourquoi as-tu choisi ce framework ?',
          questionType: QuestionType.OPEN
        }
      ]
    };

    this.questions = this.test.questions || [];
  }

  public get currentQuestion(): Question | undefined {
    return this.questions[this.currentQuestionIndex];
  }

  goToNext(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  goToPrevious(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitTest(): void {
    console.log('Réponses du candidat:', this.responses);
  }
}
