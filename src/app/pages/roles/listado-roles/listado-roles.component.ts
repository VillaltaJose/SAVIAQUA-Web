import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { RolService } from 'src/app/shared/services/api/roles/rol.service';

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
}
