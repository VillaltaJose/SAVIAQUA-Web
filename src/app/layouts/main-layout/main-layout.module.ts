import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', component: MainLayoutComponent, children: [
		// {  path: 'users', loadChildren: () => import('../../pages/settings/users/list-users/list-users.module').then(m => m.ListUsersModule) },
	] },
];

@NgModule({
	declarations: [MainLayoutComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SidebarModule,
		HeaderModule,
	],
})
export class MainLayoutModule {}
