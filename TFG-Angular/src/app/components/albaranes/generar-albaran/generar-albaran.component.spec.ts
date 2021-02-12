import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarAlbaranComponent } from './generar-albaran.component';

describe('GenerarAlbaranComponent', () => {
  let component: GenerarAlbaranComponent;
  let fixture: ComponentFixture<GenerarAlbaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarAlbaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarAlbaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
