import { Component, EventEmitter, Output } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition
import { ResultatCandidat } from '../../../shared/interfaces/resultatCandiat.interface';
import { QuestionType } from '../../../shared/interfaces/questionType.enum';
import { hugeSearch01 } from '@ng-icons/huge-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RankingService } from '../../../shared/services/ranking-service/ranking.service';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-ranking',
  imports: [AgGridAngular, NgIconComponent],
  providers: [RankingService],
  viewProviders: [provideIcons({ hugeSearch01 })],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css',
})
export class RankingComponent {
  title = 'RANKING';

  constructor(private rankingService: RankingService) {}

  rowData: ResultatCandidat[] = [
    {
      id: 'resultat123',
      score: 85,
      dateSoumission: '2024-03-05T15:00:00Z',
      testResponse: {
        id: 'response456',
        candidat: {
          id: 789,
          name: 'John Doe',
          email: 'john.doe@example.com',
          telephone: '0601020304',
        },
        test: {
          id: 'test001',
          name: 'Test de Logique',
          createdAt: '2024-03-01T12:00:00Z',
          description: 'Un test pour évaluer les compétences logiques',
          questions: [
            {
              id: 'question001',
              name: 'Quelle est la suite logique ?',
              questionType: QuestionType.MULTIPLE_CHOICE,
              answers: [
                {
                  id: 'answer001',
                  text: 'Réponse A',
                },
                {
                  id: 'answer002',
                  text: 'Réponse B',
                },
              ],
              correctAnswerId: 'answer002',
            },
          ],
          createdBy: {
            id: 1,
            name: 'Admin',
            email: 'adaa',
            password: '1234',
            role: 'admin',
          },
        },
        multipleChoiceAnswers: {
          question001: 'answer002',
        },
        openAnswers: {
          question002: "Je pense que c'est lié au contexte.",
        },
      },
      success: true,
    },
  ];
  columnDefs: ColDef[] = [
    {
      headerName: 'Candidat',
      field: 'testResponse.candidat.name',
      sortable: true,
      filter: true,
    },
    { headerName: 'Score', field: 'score', sortable: true, filter: true },
    {
      headerName: 'Date de soumission',
      field: 'dateSoumission',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Test',
      field: 'testResponse.test.name',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Créé par',
      field: 'testResponse.test.createdBy.name',
      sortable: true,
      filter: true,
    },
    { headerName: 'Succès', field: 'success', sortable: true, filter: true },
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };
}
