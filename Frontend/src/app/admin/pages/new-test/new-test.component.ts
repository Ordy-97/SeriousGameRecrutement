import { NewQuestionComponent } from './../new-question/new-question.component';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgFor,  } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-test',
  imports: [MatDialogModule, NewQuestionComponent, NgFor, FormsModule],
  templateUrl: './new-test.component.html',
  styleUrl: './new-test.component.css'
})
export class NewTestComponent {
  questions: any[] = [];

  testName = '';
  
  @ViewChildren(NewQuestionComponent) questionComponents!: QueryList<NewQuestionComponent>

  constructor() {
    this.addNewQuestion();
  }

  addNewQuestion() {
    const newQuestion = {};

    this.questions.push(newQuestion);
  }
  

  publishTest() {

    const questionsData = this.questionComponents.map(qComp => qComp.questionForm.value);

    console.log('Test Name:', this.testName);
    console.log('Questions:', questionsData);

    const payload = {
      testName: this.testName,
      questions: questionsData
    };

  }
}
