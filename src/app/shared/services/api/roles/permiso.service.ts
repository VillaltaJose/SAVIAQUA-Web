import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';

@Injectable({
	providedIn: 'root',
})
export class PermisoService {
	constructor(
		private _http: HttpClient,
	) {}

	obtenerPermisos() {
		return this._http.get<Result<any[]>>(`permisos`);
	}
}
