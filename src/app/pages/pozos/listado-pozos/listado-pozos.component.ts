import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AgregarPozoComponent } from '../agregar-pozo/agregar-pozo.component';

@Component({
	selector: 'app-listado-pozos',
	templateUrl: './listado-pozos.component.html',
	styleUrls: ['./listado-pozos.component.scss'],
})
export class ListadoPozosComponent {
	visualizacion: 'table' | 'map' = 'table';
	filtros: FormGroup;

	zoom = 15;
	center: google.maps.LatLngLiteral = { lat: -2.9006, lng: -79.0045 };
	markerOptions: google.maps.MarkerOptions = { draggable: false };
	markerPosition: google.maps.LatLngLiteral = { lat: -2.9006, lng: -79.0045 };

	constructor(
		private _nzDrawerService: NzDrawerService,
	) {
		this.filtros = new FormGroup({});
	}

	abrirDrawerNuevoPozo() {
		this._nzDrawerService.create({
			nzContent: AgregarPozoComponent,
			nzPlacement: 'right',
			nzWidth: '50rem',
			nzWrapClassName: 'full-screen-drawer',
			nzCloseOnNavigation: true,
			nzClosable: false,
		});
	}
}
