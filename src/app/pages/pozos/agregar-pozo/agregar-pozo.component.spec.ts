import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPozoComponent } from './agregar-pozo.component';

describe('AgregarPozoComponent', () => {
  let component: AgregarPozoComponent;
  let fixture: ComponentFixture<AgregarPozoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPozoComponent]
    });
    fixture = TestBed.createComponent(AgregarPozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
