import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarPozoComponent } from './visualizar-pozo.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
	declarations: [VisualizarPozoComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: VisualizarPozoComponent }]),
		NzButtonModule,
		NzIconModule,
		NgxChartsModule,
	],
})
export class VisualizarPozoModule {}
