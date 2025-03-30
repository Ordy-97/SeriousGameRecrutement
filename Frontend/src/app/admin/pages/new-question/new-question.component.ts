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
  imports: [MatSelectModule, MatFormFieldModule, NgFor, NgIconComponent, FormsModule, ReactiveFormsModule],
  viewProviders: [provideIcons({ hugeDelete04, hugeTimeQuarter, hugeImageAdd01 })],
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})
export class NewQuestionComponent implements OnInit {
  questionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.questionForm = this.fb.group({
      type: ['MULTIPLE_CHOICE', Validators.required], // Type de question
      questionText: ['', Validators.required],
      choices: this.fb.array([
        this.createChoice(), // Démarre avec une réponse
      ]),
      points: [3, [Validators.required, Validators.min(1)]], // Points
    });
  }


  createChoice(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false]
    });
  }

  get choices(): FormArray {
    return this.questionForm.get('choices') as FormArray;
  }

  addChoice() {
    this.choices.push(this.createChoice());
  }

  removeChoice(index: number) {
    if (this.choices.length > 1) {
      this.choices.removeAt(index);
    }
  }

  setCorrectAnswer(selectedIndex: number) {
    this.choices.controls.forEach((group, index) => {
      (group as FormGroup).patchValue({
        isCorrect: index === selectedIndex
      });
    });
  }

  submit() {
    console.log(this.choices.value);
  }
}
