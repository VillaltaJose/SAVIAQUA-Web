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
			labelY: 'Cloro Residual (mg/L)',
			labelX: 'Fecha de Registro',
			data: [],
		},
		{
			name: 'Distribución de Mediciones por Rango de Cloro',
			labelY: 'Número de Mediciones',
			labelX: 'Fecha de Registro',
			data: [],
		},
		{
			name: 'Número de Mediciones por Técnico en el Pozo',
			labelY: 'Número de Mediciones',
			labelX: 'Fecha de Registro',
			data: [],
		},
		{
			name: 'Número de Mediciones por Técnico en el Pozo',
			labelY: 'Número de Mediciones',
			labelX: 'Fecha de Registro',
			data: [],
		},
	];

	ultimaMedicion: any;

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
		this.obtenerUltimaMedicion();
		this.obtenerMediciones();
	}

	obtenerUltimaMedicion() {
		this._pozoService.obtenerUltimaMedicion(this.formParams.get('codigoPozo')?.value)
		.subscribe(api => {
			this.ultimaMedicion = api.value;
		});
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
		this.charts[3].data = [];

		this._pozoService.obtenerMediciones(data)
		.pipe(finalize(() => {
			this.loading.mediciones = false;
			this.formParams.enable();
		}))
		.subscribe(api => {
			this.charts[0].options = this.getDashboardData(this.charts[0], api.value, 'm1');
			this.charts[1].options = this.getDashboardData(this.charts[1], api.value, 'm2');
			this.charts[2].options = this.getDashboardData(this.charts[2], api.value, 'm3');
			this.charts[3].options = this.getDashboardData(this.charts[3], api.value, 'm4');
		});
	}

	getDashboardData(chart: any, data: any[], metrica: string, tooltip?: string) {
		data = data.reverse();
		return {
			title: {
				text: chart.name,
				textStyle: {
					fontSize: 13.2,
					fontWeight: '600',
					fontFamily: 'Manrope',
					color: '#0E1A2B',
				},
			},
			visualMap: {
				show: false,
    			dimension: 0,
				pieces: [
					{
						gt: 0,
						lte: 1000,
						color: '#73c0de'
					},
				]
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
				},
			},
			grid: {
				show: true,
				top: 40,
				bottom: 22,
				left: 30,
				right: 10,
				containLabel: true
			},
			xAxis: {
				name: chart.labelX,
				show: true,
				nameLocation: 'middle',
				nameGap: 70,
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					formatter: '{value}',
					rotate: 75,
					fontFamily: 'Manrope',
					fontSize: 10,
					color: '#0E1A2B',
					fontWeight: '450',
					interval: 1,
				},
				data: data.map(m => this._datePipe.transform(m.fechaRegistro, 'dd MMM HH:mm')),
			},
			yAxis: {
				name: chart.labelY,
				show: true,
				nameLocation: 'middle',
				nameRotate: 90,
				nameGap: 33,
				type: 'value',
				axisLabel: {
					formatter: '{value}',
					fontFamily: 'Manrope',
					fontSize: 11,
					color: '#0E1A2B',
					fontWeight: '500',
				},
				axisPointer: {
					snap: true,
				},
			},
			series: [
				{
					name: tooltip ?? metrica,
					type: 'line',
					smooth: true,
					data: data.map(m => m[metrica]),
				},
			],
		};
	}

}
