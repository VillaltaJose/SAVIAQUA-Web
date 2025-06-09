import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

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

	constructor(
		private _nzDrawerRef: NzDrawerRef,
	) {
		this.form = new FormGroup({
			nombre: new FormControl(null, [Validators.required]),
			apellido: new FormControl(null, [Validators.required]),
			correo: new FormControl(null, [Validators.required]),
			codigoRol: new FormControl(null, [Validators.required]),
			codigoJunta: new FormControl(null, [Validators.required]),
		});
	}

	guardar() {
		this.loading.guardar = true;
	}

	cerrarDrawer() {
		this._nzDrawerRef.close();
	}
}
