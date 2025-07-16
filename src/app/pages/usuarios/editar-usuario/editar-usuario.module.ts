import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarUsuarioComponent } from './editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { SelectJuntaModule } from 'src/app/shared/components/selects/select-junta/select-junta.module';
import { SelectRolModule } from 'src/app/shared/components/selects/select-rol/select-rol.module';

@NgModule({
	declarations: [EditarUsuarioComponent],
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
export class EditarUsuarioModule {}
