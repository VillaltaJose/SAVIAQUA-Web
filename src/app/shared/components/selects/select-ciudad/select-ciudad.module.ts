import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCiudadComponent } from './select-ciudad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
	declarations: [SelectCiudadComponent],
	exports: [SelectCiudadComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzSelectModule,
	],
})
export class SelectCiudadModule {}
