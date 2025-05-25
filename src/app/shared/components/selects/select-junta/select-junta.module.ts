import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectJuntaComponent } from './select-junta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
	declarations: [SelectJuntaComponent],
	exports: [SelectJuntaComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzSelectModule,
	],
})
export class SelectJuntaModule {}
