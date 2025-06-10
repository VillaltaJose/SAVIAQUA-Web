import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';

@Injectable({
	providedIn: 'root',
})
export class PozoService {
	constructor(
		private _http: HttpClient,
	) {}

	obtenerPozos(filters: any) {
		return this._http.get<Result<any[]>>('pozos', {
			params: filters as any,
		});
	}

	obtenerPozo(codigoPozo: number) {
		return this._http.get<Result<any>>(`pozos/${codigoPozo}`);
	}

	crearPozo(pozo: any) {
		return this._http.post<Result<number>>('pozos', pozo);
	}

	obtenerMediciones(filter: any) {
		return this._http.post<Result<any[]>>('pozos/mediciones', filter);
	}
}
