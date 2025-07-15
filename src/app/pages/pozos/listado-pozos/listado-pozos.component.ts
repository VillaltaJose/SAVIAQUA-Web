import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AgregarPozoComponent } from '../agregar-pozo/agregar-pozo.component';
import { PozoService } from 'src/app/shared/services/api/pozos/pozo.service';
import { finalize } from 'rxjs';
import { Metadata } from 'src/app/models/result';
import { Router } from '@angular/router';
import * as echarts from 'echarts';

@Component({
	selector: 'app-listado-pozos',
	templateUrl: './listado-pozos.component.html',
	styleUrls: ['./listado-pozos.component.scss'],
})
export class ListadoPozosComponent implements OnInit {
	visualizacion: 'table' | 'map' = 'table';
	filtros: FormGroup;

	pozos: any[] = [];
	metadata?: Metadata = {
		pageSize: 15,
		totalPages: 0,
		totalCount: 0,
		currentPage: 1,
	};

	zoom = 13;
	center: google.maps.LatLngLiteral = { lat: -2.9006, lng: -79.0045 };
	markerOptions: google.maps.MarkerOptions = { draggable: false };
	markerIcon: google.maps.Icon = {
		url: 'assets/icons/icono-pozo.png',
		scaledSize: new google.maps.Size(34, 34),
		anchor: new google.maps.Point(17, 34),
	};

	loading = {
		pozos: true,
	};

	private chart: echarts.ECharts | null = null;
	private provincesData = [
		{ name: 'Azuay', code: 'AZ', value: 881394, population: 881394 },
		{ name: 'Bolívar', code: 'BO', value: 209933, population: 209933 },
		{ name: 'Cañar', code: 'CA', value: 281396, population: 281396 },
		{ name: 'Carchi', code: 'CR', value: 186869, population: 186869 },
		{ name: 'Cotopaxi', code: 'CT', value: 488716, population: 488716 },
		{ name: 'Chimborazo', code: 'CH', value: 524004, population: 524004 },
		{ name: 'El Oro', code: 'EO', value: 715751, population: 715751 },
		{ name: 'Esmeraldas', code: 'ES', value: 643654, population: 643654 },
		{ name: 'Guayas', code: 'GU', value: 4387434, population: 4387434 },
		{ name: 'Imbabura', code: 'IM', value: 476257, population: 476257 },
		{ name: 'Loja', code: 'LO', value: 521154, population: 521154 },
		{ name: 'Los Ríos', code: 'LR', value: 921763, population: 921763 },
		{ name: 'Manabí', code: 'MA', value: 1562079, population: 1562079 },
		{
			name: 'Morona Santiago',
			code: 'MS',
			value: 196535,
			population: 196535,
		},
		{ name: 'Napo', code: 'NA', value: 133705, population: 133705 },
		{ name: 'Pastaza', code: 'PA', value: 114202, population: 114202 },
		{ name: 'Pichincha', code: 'PI', value: 3228233, population: 3228233 },
		{ name: 'Tungurahua', code: 'TU', value: 590600, population: 590600 },
		{
			name: 'Zamora Chinchipe',
			code: 'ZC',
			value: 120416,
			population: 120416,
		},
		{ name: 'Galápagos', code: 'GA', value: 33042, population: 33042 },
		{ name: 'Sucumbíos', code: 'SU', value: 230503, population: 230503 },
		{ name: 'Orellana', code: 'OR', value: 161338, population: 161338 },
		{
			name: 'Santo Domingo de los Tsáchilas',
			code: 'SD',
			value: 458580,
			population: 458580,
		},
		{ name: 'Santa Elena', code: 'SE', value: 401178, population: 401178 },
	];

	constructor(
		private _nzDrawerService: NzDrawerService,
		private _pozoService: PozoService,
		private _router: Router
	) {
		this.filtros = new FormGroup({
			codigoJunta: new FormControl(null, []),
			codigoProvincia: new FormControl(null, []),
			codigoCiudad: new FormControl(null, []),
			codigoParroquia: new FormControl(null, []),
			pageSize: new FormControl(15, [Validators.required]),
			pageNumber: new FormControl(1, [Validators.required]),
		});
	}

	ngOnInit(): void {
		this.obtenerPozos();
	}

	obtenerPozos() {
		this.loading.pozos = true;

		const filtros = this.filtros.getRawValue();

		this._pozoService
			.obtenerPozos(filtros)
			.pipe(finalize(() => (this.loading.pozos = false)))
			.subscribe((api) => {
				this.pozos = api.value;
				this.metadata = api.metadata;

				console.log('Metadata:', this.metadata);
			});
	}

	abrirDrawerNuevoPozo() {
		const drawer = this._nzDrawerService.create({
			nzContent: AgregarPozoComponent,
			nzPlacement: 'right',
			nzWidth: '50rem',
			nzWrapClassName: 'full-screen-drawer',
			nzCloseOnNavigation: true,
			nzClosable: false,
		});

		drawer.afterClose.subscribe((data) => {
			if (data) {
				this.obtenerPozos();
			}
		});
	}

	verPozo(codigo: number) {
		this._router.navigate(['/pozos', codigo]);
	}
}
