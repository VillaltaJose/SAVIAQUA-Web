import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AgregarPozoComponent } from '../agregar-pozo/agregar-pozo.component';
import { PozoService } from 'src/app/shared/services/api/pozos/pozo.service';
import { finalize } from 'rxjs';
import { Metadata } from 'src/app/models/result';
import { Router } from '@angular/router';

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
	}

	constructor(
		private _nzDrawerService: NzDrawerService,
		private _pozoService: PozoService,
		private _router: Router,
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

		this._pozoService.obtenerPozos(filtros)
		.pipe(finalize(() => this.loading.pozos = false))
		.subscribe(api => {
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
