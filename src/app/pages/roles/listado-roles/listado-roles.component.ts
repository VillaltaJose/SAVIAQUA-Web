import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { finalize } from 'rxjs';
import { RolService } from 'src/app/shared/services/api/roles/rol.service';
import { EditarRolComponent } from '../editar-rol/editar-rol.component';
import { NuevoRolComponent } from '../nuevo-rol/nuevo-rol.component';

@Component({
	selector: 'app-listado-roles',
	templateUrl: './listado-roles.component.html',
	styleUrls: ['./listado-roles.component.scss'],
})
export class ListadoRolesComponent implements OnInit {
	loading = {
		roles: true,
	};

	roles: any[] = [];

	constructor(
		private _rolService: RolService,
		private _nzDrawerService: NzDrawerService,
	) { }

	ngOnInit(): void {
		this.obtenerRoles();
	}

	obtenerRoles() {
		this.loading.roles = true;

		this._rolService.obtenerRoles()
		.pipe(finalize(() => this.loading.roles = false))
		.subscribe(api => {
			this.roles = api.value;
		});
	}

	abrirDrawerNuevoRol() {
		const drawer = this._nzDrawerService.create({
			nzContent: NuevoRolComponent,
			nzPlacement: 'right',
			nzWidth: '50rem',
			nzWrapClassName: 'full-screen-drawer',
			nzCloseOnNavigation: true,
			nzClosable: false,
		});

		drawer.afterClose.subscribe((data) => {
			if (!data) return;

			this.obtenerRoles();
		});
	}

	abrirDrawerEditarRol(codigo: number) {
		const drawer = this._nzDrawerService.create({
			nzContent: EditarRolComponent,
			nzPlacement: 'right',
			nzWidth: '50rem',
			nzWrapClassName: 'full-screen-drawer',
			nzCloseOnNavigation: true,
			nzClosable: false,
			nzContentParams: {
				codigo: codigo,
			},
		});

		drawer.afterClose.subscribe((data) => {
			if (!data) return;

			this.obtenerRoles();
		});
	}
}
