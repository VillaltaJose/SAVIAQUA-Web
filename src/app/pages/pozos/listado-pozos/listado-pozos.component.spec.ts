import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoJuntasComponent } from './listado-juntas.component';

describe('ListadoJuntasComponent', () => {
  let component: ListadoJuntasComponent;
  let fixture: ComponentFixture<ListadoJuntasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoJuntasComponent]
    });
    fixture = TestBed.createComponent(ListadoJuntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
