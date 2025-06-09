import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', component: MainLayoutComponent, children: [
		{  path: 'juntas', loadChildren: () => import('src/app/pages/juntas/listado-juntas/listado-juntas.module').then(m => m.ListadoJuntasModule) },
		{  path: 'pozos', loadChildren: () => import('src/app/pages/pozos/listado-pozos/listado-pozos.module').then(m => m.ListadoPozosModule) },
		{  path: 'pozos/:id', loadChildren: () => import('src/app/pages/pozos/visualizar-pozo/visualizar-pozo.module').then(m => m.VisualizarPozoModule) },
		{  path: 'usuarios', loadChildren: () => import('src/app/pages/usuarios/listado-usuarios/listado-usuarios.module').then(m => m.ListadoUsuariosModule) },
		{  path: 'roles', loadChildren: () => import('src/app/pages/roles/listado-roles/listado-roles.module').then(m => m.ListadoRolesModule) },
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
