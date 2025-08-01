import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPozosComponent } from './listado-pozos.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { AgregarPozoModule } from '../agregar-pozo/agregar-pozo.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SelectProvinciaModule } from 'src/app/shared/components/selects/select-provincia/select-provincia.module';
import { SelectCiudadModule } from 'src/app/shared/components/selects/select-ciudad/select-ciudad.module';
import { SelectParroquiaModule } from 'src/app/shared/components/selects/select-parroquia/select-parroquia.module';
import { SelectJuntaModule } from 'src/app/shared/components/selects/select-junta/select-junta.module';
import { ColorModule } from 'src/app/shared/pipes/color/color.module';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { EcuadorMapModule } from 'src/app/shared/components/maps/ecuador-map/ecuador-map.module';

@NgModule({
	declarations: [ListadoPozosComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: ListadoPozosComponent }]),
		FormsModule,
		ReactiveFormsModule,
		NzButtonModule,
		NzInputModule,
		NzSelectModule,
		NzTableModule,
		NzIconModule,
		NzRadioModule,
		AgregarPozoModule,
		NzDrawerModule,
		GoogleMapsModule,
		NzSpinModule,
		SelectProvinciaModule,
		SelectCiudadModule,
		SelectParroquiaModule,
		SelectJuntaModule,
		ColorModule,
		NzTagModule,
		EcuadorMapModule,
	],
})
export class ListadoPozosModule {}
