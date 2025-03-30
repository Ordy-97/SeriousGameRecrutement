import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm,FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-candidat-modal',
  templateUrl: './candidat-modal.component.html',
  styleUrls: ['./candidat-modal.component.css'],
  imports:[FormsModule,NgIf]
})
export class CandidatModalComponent {
  @Output() candidatRegistered = new EventEmitter<boolean>();
  confirmationMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const candidatData = form.value;

      this.http.post('/candidat/register', candidatData).subscribe({
        next: (response) => {
          console.log('Candidat enregistré avec succès', response);
          this.confirmationMessage = 'Candidat enregistré avec succès !';
          this.candidatRegistered.emit(true);
          form.reset();
        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement du candidat', error);
        }
      });
    }
  }

  closeModal() {
    this.candidatRegistered.emit(false); // Permet de fermer la modale
  }
}
