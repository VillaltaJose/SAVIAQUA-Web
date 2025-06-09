import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AgregarUsuarioComponent } from '../agregar-usuario/agregar-usuario.component';
import { UsuarioService } from 'src/app/shared/services/api/usuarios/usuario.service';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-listado-usuarios',
	templateUrl: './listado-usuarios.component.html',
	styleUrls: ['./listado-usuarios.component.scss'],
})
export class ListadoUsuariosComponent implements OnInit {
	filtros: FormGroup;
	loading = {
		usuarios: true,
	}
	usuarios: any[] = [];

	constructor(
		private _nzDrawerService: NzDrawerService,
		private _usuarioService: UsuarioService,
	) {
		this.filtros = new FormGroup({
			codigoJunta: new FormControl(null, []),
		});
	}

	ngOnInit(): void {
		this.obtenerUsuarios();
	}

	obtenerUsuarios() {
		this.loading.usuarios = true;

		const filters = this.filtros.getRawValue();
		this._usuarioService.obtenerUsuarios(filters)
		.pipe(finalize(() => this.loading.usuarios = false))
		.subscribe(api => {
			this.usuarios = api.value;
		});
	}

	abrirDrawerNuevoUsuario() {
		const drawer = this._nzDrawerService.create({
			nzContent: AgregarUsuarioComponent,
			nzPlacement: 'right',
			nzWidth: '50rem',
			nzWrapClassName: 'full-screen-drawer',
			nzCloseOnNavigation: true,
			nzClosable: false,
		});

		drawer.afterClose.subscribe((data) => {
			if (!data) return;

			this.obtenerUsuarios();
		});
	}
}
