import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectProvinciaComponent } from './select-provincia.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [SelectProvinciaComponent],
	exports: [SelectProvinciaComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzSelectModule,
	],
})
export class SelectProvinciaModule {}
