import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-listado-usuarios',
	templateUrl: './listado-usuarios.component.html',
	styleUrls: ['./listado-usuarios.component.scss'],
})
export class ListadoUsuariosComponent {
	filtros: FormGroup;

	constructor() {
		this.filtros = new FormGroup({});
	}
}
