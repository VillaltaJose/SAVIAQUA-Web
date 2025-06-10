import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { PozoService } from 'src/app/shared/services/api/pozos/pozo.service';

@Component({
	selector: 'app-visualizar-pozo',
	templateUrl: './visualizar-pozo.component.html',
	styleUrls: ['./visualizar-pozo.component.scss'],
})
export class VisualizarPozoComponent implements OnInit {
	formParams: FormGroup;

	loading = {
		pozo: true,
		mediciones: true,
	}

	markerOptions: google.maps.MarkerOptions = { draggable: false };
	markerIcon: google.maps.Icon = {
		url: 'assets/icons/icono-pozo.png',
		scaledSize: new google.maps.Size(34, 34),
		anchor: new google.maps.Point(17, 34),
	};

	pozo: any = null;
	mostrarModalMapa: boolean = false;
	charts: any[] = [
		{
			name: 'Cloro Residual en el Tiempo (últimos 30 días)',
			data: [],
		},
		{
			name: 'Distribución de Mediciones por Rango de Cloro',
			data: [],
		},
		{
			name: 'Número de Mediciones por Técnico en el Pozo',
			data: [],
		},
	];

	constructor(
		private _pozoService: PozoService,
		private _activatedRoute: ActivatedRoute,
		private _datePipe: DatePipe,
	) {
		const today = new Date();
		const last30Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);

		this.formParams = new FormGroup({
			codigoPozo: new FormControl(this._activatedRoute.snapshot.params['id'], [Validators.required]),
			fechaInicio: new FormControl(last30Days, [Validators.required]),
			fechaFin: new FormControl(today, [Validators.required]),
		});
	}

	ngOnInit(): void {
		this.obtenerPozo();
		this.obtenerMediciones();
	}

	obtenerPozo() {
		this.loading.pozo = true;

		this._pozoService.obtenerPozo(this.formParams.get('codigoPozo')?.value)
		.pipe(finalize(() => this.loading.pozo = false))
		.subscribe(api => {
			this.pozo = api.value;
		});
	}

	obtenerMediciones() {
		if (this.formParams.invalid) {
			this.formParams.markAllAsTouched();
			return;
		}

		this.loading.mediciones = true;
		this.formParams.disable();

		const data = this.formParams.getRawValue();

		this.charts[0].data = [];
		this.charts[1].data = [];
		this.charts[2].data = [];

		this._pozoService.obtenerMediciones(data)
		.pipe(finalize(() => {
			this.loading.mediciones = false;
			this.formParams.enable();
		}))
		.subscribe(api => {
			this.charts[0].data = api.value.map(m => {
				return {
					name: this._datePipe.transform(m.fechaRegistro, 'dd MMM yyyy HH:mm:ss'),
					value: m.m1,
				};
			});

			this.charts[1].data = api.value.map(m => {
				return {
					name: this._datePipe.transform(m.fechaRegistro, 'dd MMM yyyy HH:mm:ss'),
					value: m.m2,
				};
			});

			this.charts[2].data = api.value.map(m => {
				return {
					name: this._datePipe.transform(m.fechaRegistro, 'dd MMM yyyy HH:mm:ss'),
					value: m.m3,
				};
			});
		});
	}

}
