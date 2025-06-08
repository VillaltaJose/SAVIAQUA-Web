import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarRolComponent } from './editar-rol.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@NgModule({
	declarations: [EditarRolComponent],
	exports: [EditarRolComponent],
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
export class EditarRolModule {}
