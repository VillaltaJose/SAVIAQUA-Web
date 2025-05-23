import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
	declarations: [SidebarComponent],
	exports: [SidebarComponent],
	imports: [
		CommonModule,
		RouterModule,
		NzIconModule,
	],
})
export class SidebarModule {}
