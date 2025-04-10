import { Component, EventEmitter, Output } from '@angular/core';
import {
  NgForm,
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { TestService } from '../../shared/services/test-service/test.service';
import { Candidat } from '../../shared/interfaces/candidat.interface';
import { TestResponse } from '../../shared/interfaces/testResponse.interface';

@Component({
  selector: 'app-candidat-modal',
  templateUrl: './candidat-modal.component.html',
  styleUrls: ['./candidat-modal.component.css'],
  providers: [TestService],
  imports: [FormsModule, NgIf],
})
export class CandidatModalComponent {
  @Output() candidatRegistered = new EventEmitter<boolean>();
  confirmationMessage: string = '';

  constructor(
    private http: HttpClient,
    private testService: TestService,
  ) {}

  testResponse!: any;

  onSubmit(form: NgForm) {
    if (form.valid) {
      const candidatData: Candidat = {
        name: form.value.name,
        email: form.value.email,
        telephone: form.value.telephone,
      };

      const testId = JSON.parse(localStorage.getItem('tesID') || '');

      const parsedResponse =
        JSON.parse(localStorage.getItem('responses') || '') || {};

      this.testResponse = {
        testId: testId,
        candidat: candidatData,
        multipleChoiceAnswers: parsedResponse,
      };

      console.log('Réponse du candidat:', this.testResponse);
      // Envoi de la réponse du candidat au serveur
      this.testService.submitTestResponse(this.testResponse).subscribe(
        (response) => {
          console.log('Candidat enregistré avec succès', response);
          this.confirmationMessage = 'Candidat enregistré avec succès !';
          this.candidatRegistered.emit(true);
          form.reset();
        },
        (error) => {
          console.error("Erreur lors de l'enregistrement du candidat", error);
          this.confirmationMessage = 'Candidat enregistré avec succès !';
          this.candidatRegistered.emit(true);
        },
      );

      // this.http.post('/candidat/register', candidatData).subscribe({
      //   next: (response) => {
      //     console.log('Candidat enregistré avec succès', response);
      //     this.confirmationMessage = 'Candidat enregistré avec succès !';
      //     this.candidatRegistered.emit(true);
      //     form.reset();
      //   },
      //   error: (error) => {
      //     console.error('Erreur lors de l\'enregistrement du candidat', error);
      //   }
      // });
    }
  }

  closeModal() {
    this.candidatRegistered.emit(false); // Permet de fermer la modale
  }
}
