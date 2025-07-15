import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcuadorMapComponent } from './ecuador-map.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
	declarations: [EcuadorMapComponent],
	exports: [EcuadorMapComponent],
	imports: [
		CommonModule,
		// NgxEchartsModule,
	],
})
export class EcuadorMapModule {}
