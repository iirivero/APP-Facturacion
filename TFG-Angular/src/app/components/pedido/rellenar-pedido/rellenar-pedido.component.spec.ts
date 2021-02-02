import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RellenarPedidoComponent } from './rellenar-pedido.component';

describe('RellenarPedidoComponent', () => {
  let component: RellenarPedidoComponent;
  let fixture: ComponentFixture<RellenarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RellenarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RellenarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
