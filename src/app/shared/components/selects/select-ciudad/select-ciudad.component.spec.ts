import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCiudadComponent } from './select-ciudad.component';

describe('SelectCiudadComponent', () => {
  let component: SelectCiudadComponent;
  let fixture: ComponentFixture<SelectCiudadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCiudadComponent]
    });
    fixture = TestBed.createComponent(SelectCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
