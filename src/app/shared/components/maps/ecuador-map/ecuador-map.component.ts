import {
	Component,
	OnInit,
	OnDestroy,
	ElementRef,
	ViewChild,
	Output,
	EventEmitter,
} from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';

@Component({
	selector: 'app-ecuador-map',
	template: ` <div #mapChart class="chart-container w-full h-full"></div> `,
	styleUrls: ['./ecuador-map.component.scss'],
})
export class EcuadorMapComponent implements OnInit, OnDestroy {
	@ViewChild('mapChart', { static: true }) mapChart!: ElementRef;
	private chart: any;
	http: HttpClient;

	@Output() provinciaChange = new EventEmitter<any>();

	constructor(private httpBackend: HttpBackend) {
		this.http = new HttpClient(this.httpBackend);
	}

	ngOnInit(): void {
		this.loadMapData();
	}

	ngOnDestroy(): void {
		if (this.chart) {
			this.chart.dispose();
		}
	}

	private loadMapData(): void {
		this.http.get('./assets/maps/ecuador.geojson').subscribe({
			next: (geoJson: any) => {
				this.initializeMap(geoJson);
			},
			error: (error) => {
				console.error('Error loading GeoJSON:', error);
			},
		});
	}

	private initializeMap(geoJson: any): void {
		const modifiedGeoJson = this.adjustGalapagosPosition(geoJson);

		echarts.registerMap('Ecuador', modifiedGeoJson);
		this.chart = echarts.init(this.mapChart.nativeElement);

		const option = {
			tooltip: {
				trigger: 'item',
				formatter: (params: any) => {
					if (params.data) {
						return `<strong>${params.data.name}</strong>`;
					}
					return `<strong>${params.name}</strong><br/>Click para seleccionar`;
				},
				backgroundColor: 'rgba(0,0,0,0.7)',
				textStyle: {
					color: '#fff',
				},
			},
			series: [
				{
					name: 'Provincias del Ecuador',
					type: 'map',
					map: 'Ecuador',
					roam: false,
					selectedMode: 'single',
					nameProperty: 'nombre',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					layoutCenter: ['50%', '50%'],
					layoutSize: '100%',
					aspectScale: 0.9,
					zoom: 1.15,
					emphasis: {
						focus: 'self',
						label: {
							show: true,
							fontSize: 12,
							fontWeight: 'bold',
							color: '#000',
						},
						itemStyle: {
							areaColor: '#ffa726',
							borderColor: '#ff6f00',
							borderWidth: 1,
							shadowBlur: 5,
							shadowColor: 'rgba(0,0,0,0.2)',
						},
					},
					select: {
						label: {
							show: true,
							fontSize: 11,
							fontWeight: 'bold',
							color: '#fff',
						},
						itemStyle: {
							areaColor: '#2196f3',
							borderColor: '#1976d2',
							borderWidth: 1,
						},
					},
					itemStyle: {
						areaColor: '#e3f2fd',
						borderColor: '#1976d2',
						borderWidth: 0.5,
					},
					label: {
						show: true,
						fontSize: 8,
						color: '#333',
						emphasis: {
							show: true,
							fontSize: 12,
							fontWeight: 'bold',
						},
					},
					data: this.generateProvinceData(geoJson),
				},
			],
		};

		this.chart.setOption(option);
		this.setupEventListeners();

		// Asegurar que el mapa se redimensione correctamente
		this.setupResizeListener();
	}

	private setupEventListeners(): void {
		this.chart.on('click', (params: any) => {
			if (
				params.componentType === 'series' &&
				params.seriesType === 'map' &&
				params.name
			) {
				let provinceName = params.name;
				if (params.data && params.data.name) {
					provinceName = params.data.name;
				}

				this.provinciaChange.emit(params.data);
			}
		});
	}

	private setupResizeListener(): void {
		// Configurar listener para redimensionar cuando cambie el tamaño del contenedor
		const resizeObserver = new ResizeObserver(() => {
			if (this.chart) {
				this.chart.resize();
			}
		});

		resizeObserver.observe(this.mapChart.nativeElement);
	}

	private adjustGalapagosPosition(geoJson: any): any {
		const modifiedGeoJson = JSON.parse(JSON.stringify(geoJson)); // Deep copy

		modifiedGeoJson.features.forEach((feature: any) => {
			const provinceName =
				feature.properties.nombre ||
				feature.properties.dpa_despro ||
				'';

			if (
				provinceName.toLowerCase().includes('galápagos') ||
				provinceName.toLowerCase().includes('galapagos')
			) {
				this.adjustCoordinates(feature.geometry, 8, 1);
			}
		});

		return modifiedGeoJson;
	}

	private adjustCoordinates(
		geometry: any,
		deltaLng: number,
		deltaLat: number
	): void {
		if (geometry.type === 'Polygon') {
			geometry.coordinates.forEach((ring: any) => {
				ring.forEach((coord: any) => {
					coord[0] += deltaLng;
					coord[1] += deltaLat;
				});
			});
		} else if (geometry.type === 'MultiPolygon') {
			geometry.coordinates.forEach((polygon: any) => {
				polygon.forEach((ring: any) => {
					ring.forEach((coord: any) => {
						coord[0] += deltaLng;
						coord[1] += deltaLat;
					});
				});
			});
		}
	}

	private generateProvinceData(geoJson: any): any[] {
		const provinceData = geoJson.features.map((feature: any) => {
			const props = feature.properties;
			return {
				name: props.nombre || props.dpa_despro || 'Sin nombre',
				value: props.pob_tot || 0,
				id: props.id_prov,
				codigo: props.codigo,
				poblacion: props.pob_tot,
				analfabetismo: props.analfabeti,
				densidad: props.densidad,
				edadMedia: props.edad_media,
			};
		});
		return provinceData;
	}
}
