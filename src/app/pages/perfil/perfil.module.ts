import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
	declarations: [PerfilComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: PerfilComponent }]),
		FormsModule,
		ReactiveFormsModule,
		NzButtonModule,
		NzInputModule,
		NzSelectModule,
		NzIconModule,
		NzMessageModule,
	],
})
export class PerfilModule {}
