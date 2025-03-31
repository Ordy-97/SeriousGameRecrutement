import { NewQuestionComponent } from './../new-question/new-question.component';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgFor,  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestService } from '../../../shared/services/test-service/test.service';

@Component({
  selector: 'app-new-test',
  imports: [MatDialogModule, NewQuestionComponent, NgFor, FormsModule],
  templateUrl: './new-test.component.html',
  styleUrl: './new-test.component.css',
})
export class NewTestComponent {
  questions: any[] = [];

  testName = '';

  @ViewChildren(NewQuestionComponent)
  questionComponents!: QueryList<NewQuestionComponent>;

  constructor(private testService: TestService) {
    this.addNewQuestion();
  }

  addNewQuestion() {
    const newQuestion = {};

    this.questions.push(newQuestion);
  }

  publishTest() {
    const questionsData = this.questionComponents.map(
      (qComp) => qComp.questionForm.value,
    );

    // console.log('Test Name:', this.testName);
    // console.log('Questions:', questionsData);

    const payload = {
      name: this.testName,
      description: '',
      createdAt: new Date().toISOString(),
      questions: questionsData,
      createdByEmail: localStorage.getItem('emailAdmin'),
    };

    console.log('Payload:', payload);

    this.testService.createTestWithQuestions(payload).subscribe(
      (response) => {
        console.log('Test created successfully:', response);
        // Optionally, navigate to another page or show a success message
      },
      (error) => {
        console.error('Error creating test:', error);
        // Optionally, show an error message
      },
    );
  }
}
