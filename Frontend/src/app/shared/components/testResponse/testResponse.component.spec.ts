import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResponseComponent } from './testResponse.component';

describe('TestComponent', () => {
  let component: TestResponseComponent;
  let fixture: ComponentFixture<TestResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
