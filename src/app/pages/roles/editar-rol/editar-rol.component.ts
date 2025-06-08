import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { finalize } from 'rxjs';
import { PermisoService } from 'src/app/shared/services/api/roles/permiso.service';

@Component({
	selector: 'app-editar-rol',
	templateUrl: './editar-rol.component.html',
	styleUrls: ['./editar-rol.component.scss'],
})
export class EditarRolComponent implements OnInit {
	loading = {
		permisos: true,
		guardar: false,
	};

	@Input('codigo') codigo!: number;

	permisos: any[] = [];
	form: FormGroup;

	constructor(
		private _permisoService: PermisoService,
		private _nzDrawerRef: NzDrawerRef,
	) {
		this.form = new FormGroup({
			nombre: new FormControl(null, [Validators.required]),
			activo: new FormControl(null, []),
			permisos: new FormControl([], []),
		});
	}

	ngOnInit(): void {
		this.obtenerPermisos();
	}

	obtenerPermisos() {
		this.loading.permisos = true;

		this._permisoService.obtenerPermisos()
		.pipe(finalize(() => this.loading.permisos = false))
		.subscribe(api => {
			api.value.forEach(p => {
				p.checked = this.form.value.permisos.includes(p.codigo);
			});

			this.permisos = api.value;
		})
	}

	toggleChecks() {
		if (this.form.get('permissions')?.value.length > 0) {
			this.permisos.forEach(p => p.checked = false);
		} else {
			this.permisos.forEach(p => p.checked = true);
		}

		this.colocarPermisos()
	}

	colocarPermisos() {
		this.form.get('permisos')?.setValue(this.permisos.filter(p => p.checked).map(p => p.codigo));
	}

	cerrarDrawer() {
		this._nzDrawerRef.close();
	}
}
