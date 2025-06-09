import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarUsuarioComponent } from './agregar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { SelectRolModule } from 'src/app/shared/components/selects/select-rol/select-rol.module';
import { SelectJuntaModule } from 'src/app/shared/components/selects/select-junta/select-junta.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
	declarations: [AgregarUsuarioComponent],
	exports: [AgregarUsuarioComponent],
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
		SelectRolModule,
		SelectJuntaModule,
		NzModalModule,
	],
})
export class AgregarUsuarioModule {}
