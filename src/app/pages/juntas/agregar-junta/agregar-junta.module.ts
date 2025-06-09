import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarJuntaComponent } from './agregar-junta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SelectCiudadModule } from 'src/app/shared/components/selects/select-ciudad/select-ciudad.module';
import { SelectParroquiaModule } from 'src/app/shared/components/selects/select-parroquia/select-parroquia.module';
import { SelectProvinciaModule } from 'src/app/shared/components/selects/select-provincia/select-provincia.module';

@NgModule({
	declarations: [AgregarJuntaComponent],
	exports: [AgregarJuntaComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzInputModule,
		NzButtonModule,
		NzSelectModule,
		NzIconModule,
		NzDrawerModule,
		SelectProvinciaModule,
		SelectCiudadModule,
		SelectParroquiaModule,
		GoogleMapsModule,
	],
})
export class AgregarJuntaModule {}
