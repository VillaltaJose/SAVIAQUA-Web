import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoUsuariosComponent } from './listado-usuarios.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AgregarUsuarioModule } from '../agregar-usuario/agregar-usuario.module';
import { SelectJuntaModule } from 'src/app/shared/components/selects/select-junta/select-junta.module';

@NgModule({
	declarations: [ListadoUsuariosComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: ListadoUsuariosComponent }]),
		FormsModule,
		ReactiveFormsModule,
		NzButtonModule,
		NzTableModule,
		NzSelectModule,
		NzIconModule,
		AgregarUsuarioModule,
		SelectJuntaModule,
	],
})
export class ListadoUsuariosModule {}
