import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarJuntaComponent } from './agregar-junta.component';

describe('AgregarJuntaComponent', () => {
  let component: AgregarJuntaComponent;
  let fixture: ComponentFixture<AgregarJuntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarJuntaComponent]
    });
    fixture = TestBed.createComponent(AgregarJuntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
