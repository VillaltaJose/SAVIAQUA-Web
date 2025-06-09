import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRolComponent } from './select-rol.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [SelectRolComponent],
	exports: [SelectRolComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzSelectModule,
	],
})
export class SelectRolModule {}
