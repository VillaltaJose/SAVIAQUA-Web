import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Result } from 'src/app/models/result';

@Injectable({
	providedIn: 'root',
})
export class NotificacionService {
	totalNotificaciones$ = new BehaviorSubject<number>(0);

	constructor(
		private _http: HttpClient,
		private _router: Router,
	) {
		this.obtenerTotalNoLeidas();
	}

	obtenerTotalNoLeidas() {
		this._http.get<Result<number>>(`notificaciones/no-leidas`)
		.subscribe((data) => {
			this.totalNotificaciones$.next(data.value);
		});
	}

	obtenerNotificaciones(pageSize: number, pageNumber: number) {
		return this._http.get<Result<any>>(`notificaciones`, {
			params: {
				pageSize,
				pageNumber,
			}
		});
	}

	marcarNotificacionLeida(codigo: number) {
		return this._http.post<Result<any>>(`notificaciones/${codigo}/marcar-leida`, {});
	}

	abrirNotificacion(notificacion: any) {
		if (!notificacion.leida) {
			this.marcarNotificacionLeida(notificacion.codigo)
			.subscribe(() => {
				this.obtenerTotalNoLeidas();
			});
		}

		switch (notificacion.codigoCategoria) {
			case 1:
			case 2:
			case 3:
				this._router.navigate([`/pozos/${notificacion.referenciaInt}`]);
				console.log('Abrir notificación de tipo 1, 2 o 3');
				break;
			default:
				console.log(notificacion.codigoCategoria + ' no tiene acción asociada');
		}
	}
}
