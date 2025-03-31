import { TestService } from './../../../shared/services/test-service/test.service';
import { Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition
import { hugeSearch01 } from '@ng-icons/huge-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Test } from '../../../shared/interfaces/test.interface';
import { QuestionType } from '../../../shared/interfaces/questionType.enum';
import { MatDialog } from '@angular/material/dialog';
import { NewTestComponent } from '../new-test/new-test.component';

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

  listTests: Test[] = [];

  constructor(
    private dialog: MatDialog,
    private testService: TestService,
  ) {
    this.testService.getTests().subscribe((data) => {
      this.listTests = data;
      console.log('Liste des tests:', this.listTests);
      this.rowData = this.listTests.map((test) => ({
        ...test,
        createdAt: new Date(test.createdAt).toLocaleDateString('fr-FR'),
      }));
    });
  }

  rowData: Test[] = [];

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

  openModal(): void {
    const dialogRef = this.dialog.open(NewTestComponent, {
      panelClass: ['custom-modal-panel'],
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La modale est fermée');
      console.log('Résultat :', result);
    });
  }
}
