import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarPozoComponent } from './agregar-pozo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@NgModule({
	declarations: [AgregarPozoComponent],
	exports: [AgregarPozoComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzInputModule,
		NzButtonModule,
		NzSelectModule,
		NzIconModule,
		NzDrawerModule,
	],
})
export class AgregarPozoModule {}
