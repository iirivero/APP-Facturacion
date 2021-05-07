import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAlbaranComponent } from './detalles-albaran.component';

describe('DetallesAlbaranComponent', () => {
  let component: DetallesAlbaranComponent;
  let fixture: ComponentFixture<DetallesAlbaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesAlbaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesAlbaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
