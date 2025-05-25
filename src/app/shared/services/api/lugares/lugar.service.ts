import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';

@Injectable({
	providedIn: 'root',
})
export class LugarService {
	constructor(
		private _http: HttpClient,
	) {}

	obtenerProvincias() {
		return this._http.get<Result<any[]>>('lugares/provincias');
	}

	obtenerCiudades(codigoProvincia: number) {
		return this._http.get<Result<any[]>>(`lugares/provincias/${codigoProvincia}/ciudades`);
	}

	obtenerParroquias(codigoProvincia: number, codigoCiudad: number) {
		return this._http.get<Result<any[]>>(`lugares/provincias/${codigoProvincia}/ciudades/${codigoCiudad}/parroquias`);
	}
}
