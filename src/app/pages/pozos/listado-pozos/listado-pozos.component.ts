import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-listado-pozos',
	templateUrl: './listado-pozos.component.html',
	styleUrls: ['./listado-pozos.component.scss'],
})
export class ListadoPozosComponent {
	visualizacion: 'table' | 'map' = 'table';
	filtros: FormGroup;

	constructor() {
		this.filtros = new FormGroup({});
	}
}
