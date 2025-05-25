import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectParroquiaComponent } from './select-parroquia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
	declarations: [SelectParroquiaComponent],
	exports: [SelectParroquiaComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzSelectModule,
	],
})
export class SelectParroquiaModule {}
