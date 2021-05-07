import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarArticulosComponent } from './editar-articulos.component';

describe('EditarArticulosComponent', () => {
  let component: EditarArticulosComponent;
  let fixture: ComponentFixture<EditarArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
