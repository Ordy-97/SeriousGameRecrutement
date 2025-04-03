import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { hugeDelete04, hugeTimeQuarter, hugeImageAdd01 } from '@ng-icons/huge-icons';
import { provideIcons } from '@ng-icons/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-new-question',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    NgFor,
    NgIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  viewProviders: [
    provideIcons({ hugeDelete04, hugeTimeQuarter, hugeImageAdd01 }),
  ],
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css',
})
export class NewQuestionComponent implements OnInit {
  questionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.questionForm = this.fb.group({
      questionType: ['MULTIPLE_CHOICE', Validators.required], // Type de question
      name: ['', Validators.required],
      answers: this.fb.array([
        this.createAnswer(0), // Démarre avec une réponse
      ]),
      correctAnswerId: [null, Validators.required], // ID de la réponse correcte
    });
  }

  createAnswer(i: number): FormGroup {
    return this.fb.group({
      id: [i, Validators.required],
      text: ['', Validators.required],
    });
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  addAnswer() {
    this.answers.push(this.createAnswer(this.answers.length));
    console.log(this.answers.value);
  }

  removeAnswer(index: number) {
    if (this.answers.length > 1) {
      this.answers.removeAt(index);
    }
  }

  setCorrectAnswer(selectedIndex: number) {
    this.questionForm.patchValue({
      correctAnswerId: selectedIndex,
    });
  }

  submit() {
    console.log(this.answers.value);
  }
}
