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
	],
})
export class ListadoPozosModule {}
