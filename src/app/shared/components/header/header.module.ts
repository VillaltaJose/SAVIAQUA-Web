import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DrawerNotificacionesComponent } from '../drawer-notificaciones/drawer-notificaciones.component';

@NgModule({
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
	imports: [
		CommonModule,
		NzIconModule,
		NzButtonModule,
		DrawerNotificacionesComponent,
	],
})
export class HeaderModule {}
