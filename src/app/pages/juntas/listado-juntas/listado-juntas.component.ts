import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { finalize } from 'rxjs';
import { Metadata } from 'src/app/models/result';
import { JuntaService } from 'src/app/shared/services/api/juntas/junta.service';

@Component({
	selector: 'app-listado-juntas',
	templateUrl: './listado-juntas.component.html',
	styleUrls: ['./listado-juntas.component.scss'],
})
export class ListadoJuntasComponent {
	visualizacion: 'table' | 'map' = 'table';
	filtros: FormGroup;

	juntas: any[] = [];
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
		juntas: true,
	}

	constructor(
		private _nzDrawerService: NzDrawerService,
		private _router: Router,
		private _juntaService: JuntaService,
	) {
		this.filtros = new FormGroup({
			codigoProvincia: new FormControl(null, []),
			codigoCiudad: new FormControl(null, []),
			codigoParroquia: new FormControl(null, []),
			pageSize: new FormControl(15, [Validators.required]),
			pageNumber: new FormControl(1, [Validators.required]),
		});
	}

	ngOnInit(): void {
		this.obtenerJuntas();
	}

	obtenerJuntas() {
		this.loading.juntas = true;

		const filtros = this.filtros.getRawValue();

		this._juntaService.obtenerJuntas(filtros)
		.pipe(finalize(() => this.loading.juntas = false))
		.subscribe(api => {
			this.juntas = api.value;
			this.metadata = api.metadata;

			console.log('Metadata:', this.metadata);
		});
	}

	abrirDrawerNuevoPozo() {
		// const drawer = this._nzDrawerService.create({
		// 	nzContent: AgregarPozoComponent,
		// 	nzPlacement: 'right',
		// 	nzWidth: '50rem',
		// 	nzWrapClassName: 'full-screen-drawer',
		// 	nzCloseOnNavigation: true,
		// 	nzClosable: false,
		// });

		// drawer.afterClose.subscribe((data) => {
		// 	if (data) {
		// 		this.obtenerPozos();
		// 	}
		// });
	}

	verPozos(codigo: number) {
		// this._router.navigate(['/pozos', codigo]);
	}
}
