import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerNotificacionesComponent } from './drawer-notificaciones.component';

describe('DrawerNotificacionesComponent', () => {
  let component: DrawerNotificacionesComponent;
  let fixture: ComponentFixture<DrawerNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerNotificacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
