import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPozoComponent } from './visualizar-pozo.component';

describe('VisualizarPozoComponent', () => {
  let component: VisualizarPozoComponent;
  let fixture: ComponentFixture<VisualizarPozoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarPozoComponent]
    });
    fixture = TestBed.createComponent(VisualizarPozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
