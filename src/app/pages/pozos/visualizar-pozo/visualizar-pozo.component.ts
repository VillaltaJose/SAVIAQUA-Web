import { Component } from '@angular/core';

@Component({
	selector: 'app-visualizar-pozo',
	templateUrl: './visualizar-pozo.component.html',
	styleUrls: ['./visualizar-pozo.component.scss'],
})
export class VisualizarPozoComponent {
	charts: any[] = [
		{
			name: 'Cloro Residual en el Tiempo (últimos 30 días)',
			data: [
				{ "name": "2024-05-01", "value": 0.45, "extra": { "day": "1" } },
				{ "name": "2024-05-02", "value": 0.50, "extra": { "day": "2" } },
				{ "name": "2024-05-03", "value": 0.42, "extra": { "day": "3" } },
			],
		},
		{
			name: 'Distribución de Mediciones por Rango de Cloro',
			data: [
				{ "name": "Dentro del rango (0.2–1.5 mg/L)", "value": 25, "extra": { "code": "ok" } },
				{ "name": "Bajo (< 0.2 mg/L)", "value": 4, "extra": { "code": "low" } },
				{ "name": "Alto (> 1.5 mg/L)", "value": 1, "extra": { "code": "high" } }
			],
		},
		{
			name: 'Número de Mediciones por Técnico en el Pozo',
			data: [
				{ "name": "Técnico Juan", "value": 12, "extra": { "id": "tech01" } },
				{ "name": "Técnico María", "value": 8, "extra": { "id": "tech02" } },
				{ "name": "Técnico Luis", "value": 10, "extra": { "id": "tech03" } },
			],
		},
	];
}
