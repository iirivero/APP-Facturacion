import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbaranesComponent } from './albaranes.component';

describe('AlbaranesComponent', () => {
  let component: AlbaranesComponent;
  let fixture: ComponentFixture<AlbaranesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbaranesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbaranesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
