import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RellenarFacturaComponent } from './rellenar-factura.component';

describe('RellenarFacturaComponent', () => {
  let component: RellenarFacturaComponent;
  let fixture: ComponentFixture<RellenarFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RellenarFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RellenarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
