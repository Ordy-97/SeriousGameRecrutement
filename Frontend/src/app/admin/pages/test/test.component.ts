import { Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition
import { hugeSearch01 } from '@ng-icons/huge-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Test } from '../../../shared/interfaces/test.interface';
import { QuestionType } from '../../../shared/interfaces/questionType.enum';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-test',
  imports: [AgGridAngular, NgIconComponent],
  viewProviders: [provideIcons({ hugeSearch01 })],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  title = 'TEST';

  rowData: Test[] = [
    {
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
    },
  ];

  columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    { headerName: 'Nom', field: 'name', sortable: true, filter: true },
    {
      headerName: 'Nombre de questions',
      field: 'questions.length',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Description',
      field: 'description',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Date de creation',
      field: 'createdAt',
      sortable: true,
      filter: true,
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };
}
