import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoJuntasComponent } from './listado-juntas.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { SelectCiudadModule } from 'src/app/shared/components/selects/select-ciudad/select-ciudad.module';
import { SelectParroquiaModule } from 'src/app/shared/components/selects/select-parroquia/select-parroquia.module';
import { SelectProvinciaModule } from 'src/app/shared/components/selects/select-provincia/select-provincia.module';
import { ColorModule } from 'src/app/shared/pipes/color/color.module';
import { AgregarJuntaModule } from '../agregar-junta/agregar-junta.module';

@NgModule({
	declarations: [ListadoJuntasComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: ListadoJuntasComponent }]),
		FormsModule,
		ReactiveFormsModule,
		NzButtonModule,
		NzInputModule,
		NzSelectModule,
		NzTableModule,
		NzIconModule,
		NzRadioModule,
		NzDrawerModule,
		GoogleMapsModule,
		NzSpinModule,
		SelectProvinciaModule,
		SelectCiudadModule,
		SelectParroquiaModule,
		ColorModule,
		NzTagModule,
		AgregarJuntaModule,
	],
})
export class ListadoJuntasModule {}
