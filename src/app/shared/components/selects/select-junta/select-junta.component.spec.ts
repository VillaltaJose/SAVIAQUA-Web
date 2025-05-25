import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectJuntaComponent } from './select-junta.component';

describe('SelectJuntaComponent', () => {
  let component: SelectJuntaComponent;
  let fixture: ComponentFixture<SelectJuntaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectJuntaComponent]
    });
    fixture = TestBed.createComponent(SelectJuntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
