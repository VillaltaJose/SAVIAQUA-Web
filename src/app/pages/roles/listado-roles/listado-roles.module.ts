import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoRolesComponent } from './listado-roles.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { EditarRolModule } from '../editar-rol/editar-rol.module';

@NgModule({
	declarations: [ListadoRolesComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: ListadoRolesComponent }]),
		NzButtonModule,
		NzInputModule,
		NzTableModule,
		NzIconModule,
		NzDrawerModule,
		EditarRolModule,
	],
})
export class ListadoRolesModule {}
