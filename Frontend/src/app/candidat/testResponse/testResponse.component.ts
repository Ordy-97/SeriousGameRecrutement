import { Question } from '../../shared/interfaces/question.interface';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { QuestionType } from '../../shared/interfaces/questionType.enum';
import { Test } from '../../shared/interfaces/test.interface';
import { MatDialog } from '@angular/material/dialog';
import { CandidatModalComponent } from '../candidat-modal/candidat-modal.component';
import { TestService } from '../../shared/services/test-service/test.service';

  
@Component({
  selector: 'app-test-response',
  templateUrl: './testResponse.component.html',
  styleUrls: ['./testResponse.component.css'],
  imports: [NgIf,NgFor,FormsModule ],
  providers: [TestService],
})
export class TestResponseComponent implements OnInit {
  QuestionType = QuestionType;

  currentQuestionIndex = 0;
  test?: Test;
  questions: Question[] = [];

  responses: { [key: string]: string | null } = {};
  
  constructor(private dialog: MatDialog, private testService: TestService) {
    this.testService.getTests().subscribe((data) => {
      this.test = data[data.length - 1]; // Récupérer le dernier test
      this.questions = this.test.questions || [];
      console.log('Test:', this.test);
      console.log('Questions:', this.questions);
      localStorage.setItem('tesID', JSON.stringify(this.test.id)); // Enregistrer le test dans le localStorage
    })
  }

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
    // // test statique
    // this.test = {
    //   id: '1',
    //   name: 'Test Démo Statique',
    //   createdAt: new Date().toISOString(),
    //   description: 'Un test statique pour démo UI',
    //   questions: [
    //     {
    //       id: 'q1',
    //       name: 'Quel est ton framework frontend préféré ?',
    //       questionType: QuestionType.MULTIPLE_CHOICE,
    //       answers: [
    //         { id: '1', text: 'Angular' },
    //         { id: '2', text: 'React' },
    //         { id: '3', text: 'Vue' },
    //       ]
    //     },
    //     {
    //       id: 'q2',
    //       name: 'Pourquoi as-tu choisi ce framework ?',
    //       questionType: QuestionType.OPEN
    //     }
    //   ]
    // };

    // this.questions = this.test.questions || [];
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
    localStorage.setItem('responses', JSON.stringify(this.responses));
    this.openCandidatModal(); // Ouvrir la modale après soumission
  }
}
