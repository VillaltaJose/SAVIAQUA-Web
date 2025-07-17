import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { finalize } from 'rxjs';
import { Message, Result } from 'src/app/models/result';
import { PermisoService } from 'src/app/shared/services/api/roles/permiso.service';
import { RolService } from 'src/app/shared/services/api/roles/rol.service';

@Component({
	selector: 'app-nuevo-rol',
	templateUrl: './nuevo-rol.component.html',
	styleUrls: ['./nuevo-rol.component.scss'],
})
export class NuevoRolComponent {
	loading = {
		permisos: true,
		guardar: false,
	};

	permisos: any[] = [];
	form: FormGroup;
	errores: Message[] = [];

	constructor(
		private _permisoService: PermisoService,
		private _rolService: RolService,
		private _nzDrawerRef: NzDrawerRef,
	) {
		this.form = new FormGroup({
			nombre: new FormControl(null, [Validators.required]),
			descripcion: new FormControl(null, [Validators.required]),
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

	guardarCambios() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		this.loading.guardar = true;
		this.errores = [];

		const data = this.form.getRawValue();

		this._rolService.registrarRol(data)
		.pipe(finalize(() => this.loading.guardar = false))
		.subscribe(api => {
			this._nzDrawerRef.close(api.value);
		}, (error: Result<void>) => {
			this.errores = error.messages;
		});
	}
}
