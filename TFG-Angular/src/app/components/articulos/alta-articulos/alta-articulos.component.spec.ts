import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaArticulosComponent } from './alta-articulos.component';

describe('AltaArticulosComponent', () => {
  let component: AltaArticulosComponent;
  let fixture: ComponentFixture<AltaArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
