import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';

@Injectable({
	providedIn: 'root',
})
export class RolService {
	constructor(
		private _http: HttpClient,
	) {}

	obtenerRoles() {
		return this._http.get<Result<any[]>>(`roles`);
	}

	obtenerRol(codigo: number) {
		return this._http.get<Result<any>>(`roles/${codigo}`);
	}

	registrarRol(rol: any) {
		return this._http.post<Result<void>>(`roles`, rol);
	}

	actualizarRol(rol: any) {
		return this._http.put<Result<number>>(`roles`, rol);
	}
}
