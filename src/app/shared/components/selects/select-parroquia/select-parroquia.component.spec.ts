import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectParroquiaComponent } from './select-parroquia.component';

describe('SelectParroquiaComponent', () => {
  let component: SelectParroquiaComponent;
  let fixture: ComponentFixture<SelectParroquiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectParroquiaComponent]
    });
    fixture = TestBed.createComponent(SelectParroquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
