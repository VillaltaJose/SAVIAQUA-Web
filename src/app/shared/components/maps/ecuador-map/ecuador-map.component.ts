import {
	Component,
	OnInit,
	OnDestroy,
	ElementRef,
	ViewChild,
} from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';

@Component({
	selector: 'app-ecuador-map',
	template: `
		<div class="map-container">
			<h2>Mapa del Ecuador</h2>
			<div class="map-controls">
				<button (click)="focusOnMainland()" class="control-btn">
					<span>🔍</span> Enfocar Continental
				</button>
				<button (click)="showFullMap()" class="control-btn">
					<span>🌍</span> Mostrar Todo
				</button>
				<button (click)="clearSelection()" class="control-btn">
					<span>🗑️</span> Limpiar Selección
				</button>
			</div>
			<div #mapChart class="chart-container"></div>
			<div class="selected-province" *ngIf="selectedProvince">
				<p>
					Provincia seleccionada:
					<strong>{{ selectedProvince }}</strong>
				</p>
			</div>
		</div>
	`,
	styles: [
		`
			.map-container {
				width: 100%;
				height: 100vh;
				padding: 20px;
				box-sizing: border-box;
			}

			.chart-container {
				width: 100%;
				height: 600px;
				border: 1px solid #ddd;
				border-radius: 8px;
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
			}

			.selected-province {
				margin-top: 20px;
				padding: 15px;
				background-color: #f0f8ff;
				border-radius: 5px;
				border-left: 4px solid #007bff;
			}

			.map-controls {
				display: flex;
				gap: 10px;
				margin-bottom: 20px;
				justify-content: center;
				flex-wrap: wrap;
			}

			.control-btn {
				display: flex;
				align-items: center;
				gap: 5px;
				padding: 8px 16px;
				border: 1px solid #ddd;
				border-radius: 5px;
				background-color: #f8f9fa;
				cursor: pointer;
				transition: all 0.2s ease;
				font-size: 14px;
			}

			.control-btn:hover {
				background-color: #e9ecef;
				border-color: #adb5bd;
				transform: translateY(-1px);
			}

			.control-btn:active {
				transform: translateY(0);
			}

			h2 {
				text-align: center;
				color: #333;
				margin-bottom: 20px;
			}

			@media (max-width: 768px) {
				.map-container {
					padding: 10px;
				}

				.chart-container {
					height: 500px;
				}

				.control-btn {
					font-size: 12px;
					padding: 6px 12px;
				}
			}
		`,
	],
})
export class EcuadorMapComponent implements OnInit, OnDestroy {
	@ViewChild('mapChart', { static: true }) mapChart!: ElementRef;

	private chart: any;
	selectedProvince: string = '';

	http: HttpClient;

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
		// Registrar el mapa en ECharts
		echarts.registerMap('Ecuador', geoJson);

		// Inicializar el gráfico
		this.chart = echarts.init(this.mapChart.nativeElement);

		// Configurar las opciones del mapa
		const option = {
			title: {
				text: 'Provincias del Ecuador',
				left: 'center',
				top: 20,
				textStyle: {
					fontSize: 18,
					fontWeight: 'bold',
					color: '#333',
				},
			},
			tooltip: {
				trigger: 'item',
				formatter: (params: any) => {
					// Verificar si tenemos datos de la provincia
					if (params.data) {
						return `<strong>${params.data.name}</strong><br/>
                    Población: ${
						params.data.poblacion?.toLocaleString() || 'N/A'
					}<br/>
                    Densidad: ${params.data.densidad || 'N/A'} hab/km²<br/>
                    Edad Media: ${params.data.edadMedia || 'N/A'} años<br/>
                    <em>Click para seleccionar</em>`;
					}
					// Fallback para cuando no hay datos específicos
					return `<strong>${params.name}</strong><br/>Click para seleccionar`;
				},
				backgroundColor: 'rgba(0,0,0,0.8)',
				textStyle: {
					color: '#fff',
				},
			},
			visualMap: {
				show: false,
			},
			series: [
				{
					name: 'Provincias del Ecuador',
					type: 'map',
					map: 'Ecuador',
					roam: true,
					scaleLimit: {
						min: 0.8,
						max: 3,
					},
					selectedMode: 'single',
					nameProperty: 'nombre',
					// Configurar el layout para centrar mejor el mapa
					left: '10%',
					right: '10%',
					top: '15%',
					bottom: '10%',
					// Configurar el aspecto del mapa
					aspectScale: 0.75, // Reducir el estiramiento vertical
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
							borderWidth: 2,
							shadowBlur: 10,
							shadowColor: 'rgba(0,0,0,0.5)',
						},
					},
					select: {
						label: {
							show: true,
							fontSize: 12,
							fontWeight: 'bold',
							color: '#fff',
						},
						itemStyle: {
							areaColor: '#2196f3',
							borderColor: '#1976d2',
							borderWidth: 2,
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
					// Usar los datos del GeoJSON directamente
					data: this.generateProvinceData(geoJson),
				},
			],
		};

		// Configurar el gráfico
		this.chart.setOption(option);

		// Después de configurar, centrar el mapa en Ecuador continental
		setTimeout(() => {
			this.centerMapOnMainland();
		}, 100);

		// Event listeners más específicos
		this.chart.on('click', (params: any) => {
			console.log('Click detectado:', params);

			// Verificar múltiples condiciones para asegurar que es un click en provincia
			if (
				params.componentType === 'series' &&
				params.seriesType === 'map' &&
				params.name
			) {
				// Obtener el nombre de la provincia
				let provinceName = params.name;

				// Si tenemos datos específicos, usar el nombre de ahí
				if (params.data && params.data.name) {
					provinceName = params.data.name;
				}

				console.log('Provincia clickeada:', provinceName);
				this.onProvinceClick(provinceName);
			}
		});

		// Event listener para hover
		this.chart.on('mouseover', (params: any) => {
			if (
				params.componentType === 'series' &&
				params.seriesType === 'map' &&
				params.name
			) {
				let provinceName = params.name;
				if (params.data && params.data.name) {
					provinceName = params.data.name;
				}

				console.log('Hover sobre:', provinceName);
			}
		});

		// Event listener para cuando se quita el hover
		this.chart.on('mouseout', (params: any) => {
			if (
				params.componentType === 'series' &&
				params.seriesType === 'map' &&
				params.name
			) {
				console.log('Saliendo del hover');
			}
		});

		// Manejar redimensionamiento de ventana
		const resizeHandler = () => {
			if (this.chart) {
				this.chart.resize();
			}
		};

		window.addEventListener('resize', resizeHandler);
	}

	private centerMapOnMainland(): void {
		// Centrar el mapa en Ecuador continental (excluyendo Galápagos)
		if (this.chart) {
			this.chart.dispatchAction({
				type: 'restore',
			});

			// Hacer zoom a la región continental
			this.chart.dispatchAction({
				type: 'dataZoom',
				start: 0,
				end: 100,
			});
		}
	}

	// Método público para centrar el mapa
	public focusOnMainland(): void {
		this.centerMapOnMainland();
	}

	// Método público para mostrar todo el mapa (incluyendo Galápagos)
	public showFullMap(): void {
		if (this.chart) {
			this.chart.dispatchAction({
				type: 'restore',
			});
		}
	}

	private generateProvinceData(geoJson: any): any[] {
		// Crear un array con los datos de cada provincia
		const provinceData = geoJson.features.map((feature: any) => {
			const props = feature.properties;
			return {
				name: props.nombre || props.dpa_despro || 'Sin nombre',
				value: props.pob_tot || 0,
				// Datos adicionales
				id: props.id_prov,
				codigo: props.codigo,
				poblacion: props.pob_tot,
				analfabetismo: props.analfabeti,
				densidad: props.densidad,
				edadMedia: props.edad_media,
			};
		});

		console.log('Datos de provincias generados:', provinceData);
		return provinceData;
	}

	private onProvinceClick(provinceName: string): void {
		this.selectedProvince = provinceName;
		console.log('Provincia seleccionada:', provinceName);

		// Aquí puedes agregar más lógica para manejar el click
		// Por ejemplo, navegar a otra página, mostrar información detallada, etc.
		this.handleProvinceSelection(provinceName);
	}

	private handleProvinceSelection(provinceName: string): void {
		// Ejemplo de lógica adicional al seleccionar una provincia
		// Buscar datos adicionales de la provincia seleccionada
		const provinceData = this.getProvinceData(provinceName);

		if (provinceData) {
			console.log('Datos de la provincia:', {
				nombre: provinceData.name,
				codigo: provinceData.codigo,
				poblacion: provinceData.poblacion,
				densidad: provinceData.densidad,
				analfabetismo: provinceData.analfabetismo,
				edadMedia: provinceData.edadMedia,
			});
		}

		// Ejemplos específicos para algunas provincias
		switch (provinceName.toLowerCase()) {
			case 'pichincha':
				console.log('Capital: Quito');
				break;
			case 'guayas':
				console.log('Capital: Guayaquil');
				break;
			case 'azuay':
				console.log('Capital: Cuenca');
				break;
			case 'bolivar':
				console.log('Capital: Guaranda');
				break;
			default:
				console.log(`Información adicional de ${provinceName}`);
		}
	}

	private getProvinceData(provinceName: string): any {
		// Buscar los datos de la provincia en el mapa
		const series = this.chart.getOption().series[0];
		if (series && series.data) {
			return series.data.find(
				(item: any) =>
					item.name.toLowerCase() === provinceName.toLowerCase()
			);
		}
		return null;
	}

	// Método público para obtener la provincia seleccionada
	getSelectedProvince(): string {
		return this.selectedProvince;
	}

	// Método público para limpiar la selección
	clearSelection(): void {
		this.selectedProvince = '';
	}

	// Método público para obtener datos de una provincia
	getProvinceFullData(provinceName: string): any {
		return this.getProvinceData(provinceName);
	}

	// Método público para obtener todas las provincias
	getAllProvinces(): string[] {
		const series = this.chart?.getOption()?.series[0];
		if (series && series.data) {
			return series.data.map((item: any) => item.name);
		}
		return [];
	}
}
