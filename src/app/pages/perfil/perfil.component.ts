import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs';
import { Result } from 'src/app/models/result';
import { PerfilService } from 'src/app/shared/services/api/perfil/perfil.service';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
	formPerfil: FormGroup;
	formClave: FormGroup;

	loading = {
		obtener: true,
		actualizar: false,
		clave: false,
	};

	errores: any = {
		perfil: [],
		clave: [],
	}

	requisitosClave = [
		{ label: 'Mínimo 8 caracteres', regex: /.{8,}/ },
		{ label: 'Al menos una letra mayúscula', regex: /[A-Z]/ },
		{ label: 'Al menos una letra minúscula', regex: /[a-z]/ },
		{ label: 'Al menos un número', regex: /\d/ },
		{ label: 'Al menos un caracter especial', regex: /[^a-zA-Z0-9]/ },
	];

	constructor(
		private _perfilService: PerfilService,
		private _nzMessageService: NzMessageService,
	) {
		this.formPerfil = new FormGroup({
			nombres: new FormControl(null, [Validators.required]),
			apellidos: new FormControl(null, [Validators.required]),
			correo: new FormControl(null, [Validators.required, Validators.email]),
			junta: new FormControl({value: null, disabled: true}, [Validators.required, Validators.email]),
			rol: new FormControl({value: null, disabled: true}, [Validators.required, Validators.email]),
		});
		this.formClave = new FormGroup({
			actual: new FormControl(null, [Validators.required]),
			nueva: new FormControl(null, [Validators.required, Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]),
			confirmar: new FormControl(null, [Validators.required, Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]),
		});
	}

	ngOnInit(): void {
		this.obtenerPerfil();
	}

	obtenerPerfil() {
		this.loading.obtener = true;

		this._perfilService.obtenerPerfil()
		.pipe(finalize(() => this.loading.obtener = false))
		.subscribe(api => {
			this.formPerfil.patchValue(api.value);
		}, (error: Result<void>) => {
			this.errores.perfil = error.messages;
		});
	}

	actualizarPerfil() {
		if (this.formPerfil.invalid) {
			this.formPerfil.markAllAsTouched();
			return;
		}

		this.loading.actualizar = true;
		this.errores.perfil = [];

		this._perfilService.actualizarPerfil(this.formPerfil.getRawValue())
		.pipe(finalize(() => this.loading.actualizar = false))
		.subscribe(api => {
			this.obtenerPerfil();
			this._nzMessageService.success('Perfil actualizado correctamente');
		}, (error: Result<void>) => {
			this.errores.perfil = error.messages;
		});
	}

	actualizarClave() {

	}
}
