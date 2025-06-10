import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VisualizarPozoComponent } from './visualizar-pozo.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
	declarations: [VisualizarPozoComponent],
	providers: [DatePipe],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: VisualizarPozoComponent }]),
		FormsModule,
		ReactiveFormsModule,
		NzButtonModule,
		NzIconModule,
		NgxChartsModule,
		NzInputModule,
		NzDatePickerModule,
		NzSpinModule,
		NzModalModule,
		GoogleMapsModule,
	],
})
export class VisualizarPozoModule {}
