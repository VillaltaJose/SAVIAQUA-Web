import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs';
import { Message, Result } from 'src/app/models/result';
import { UsuarioService } from 'src/app/shared/services/api/usuarios/usuario.service';

@Component({
	selector: 'app-agregar-usuario',
	templateUrl: './agregar-usuario.component.html',
	styleUrls: ['./agregar-usuario.component.scss'],
})
export class AgregarUsuarioComponent {
	loading = {
		guardar: false,
	};

	form: FormGroup;
	errors: Message[] = [];

	constructor(
		private _nzDrawerRef: NzDrawerRef,
		private _usuarioService: UsuarioService,
		private _nzModalService: NzModalService,
	) {
		this.form = new FormGroup({
			nombres: new FormControl(null, [Validators.required]),
			apellidos: new FormControl(null, [Validators.required]),
			correo: new FormControl(null, [Validators.required]),
			codigoRol: new FormControl(null, [Validators.required]),
			codigoJunta: new FormControl(null, [Validators.required]),
		});
	}

	guardar() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		this.loading.guardar = true;
		this.form.disable();

		const data = this.form.getRawValue();
		this._usuarioService.registrarNuevoUsuario(data)
		.pipe(finalize(() => {
			this.loading.guardar = false;
			this.form.enable();
		}))
		.subscribe(api => {
			this._nzDrawerRef.close(api.value);
			this._nzModalService.success({
				nzTitle: 'Éxito',
				nzContent: 'Usuario registrado correctamente. La clave temporal autogenerada es: ' + api.value.clave,
			});
		}, (error: Result<void>) => {
			this.errors = error.messages;
		});
	}

	cerrarDrawer() {
		this._nzDrawerRef.close();
	}
}
