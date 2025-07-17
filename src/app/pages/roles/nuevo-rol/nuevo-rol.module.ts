import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoRolComponent } from './nuevo-rol.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
	declarations: [NuevoRolComponent],
	exports: [NuevoRolComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzInputModule,
		NzSelectModule,
		NzCheckboxModule,
		NzDrawerModule,
		NzButtonModule,
		NzSwitchModule,
	],
})
export class NuevoRolModule {}
