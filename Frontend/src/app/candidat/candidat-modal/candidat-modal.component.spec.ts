import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatModalComponent } from './candidat-modal.component';

describe('CandidatModalComponent', () => {
  let component: CandidatModalComponent;
  let fixture: ComponentFixture<CandidatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
