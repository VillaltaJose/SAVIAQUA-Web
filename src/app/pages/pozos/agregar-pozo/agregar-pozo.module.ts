import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarPozoComponent } from './agregar-pozo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { SelectJuntaModule } from 'src/app/shared/components/selects/select-junta/select-junta.module';
import { SelectProvinciaModule } from 'src/app/shared/components/selects/select-provincia/select-provincia.module';
import { SelectCiudadModule } from 'src/app/shared/components/selects/select-ciudad/select-ciudad.module';
import { SelectParroquiaModule } from 'src/app/shared/components/selects/select-parroquia/select-parroquia.module';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
	declarations: [AgregarPozoComponent],
	exports: [AgregarPozoComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzInputModule,
		NzButtonModule,
		NzSelectModule,
		NzIconModule,
		NzDrawerModule,
		SelectJuntaModule,
		SelectProvinciaModule,
		SelectCiudadModule,
		SelectParroquiaModule,
		GoogleMapsModule,
	],
})
export class AgregarPozoModule {}
