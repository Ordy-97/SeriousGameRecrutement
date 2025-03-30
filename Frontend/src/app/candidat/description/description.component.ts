import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  currentStep: number = 0; // Indique l'étape actuelle
  steps: string[] = [
    "Bienvenue dans le test de logique.",
    "Ce test évalue votre capacité de raisonnement logique et analytique.",
    "Vous aurez un temps limité pour répondre aux questions.",
    "Assurez-vous d'être prêt avant de commencer."
  ];

  constructor(private router: Router) {}

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;  // Passer à l'étape suivante
    } else {
      this.startTest();  // Dernière étape, commence le test
    }
  }

  startTest() {
    this.router.navigate(['/admin/test']);  // Redirige vers la page du test
  }
}
