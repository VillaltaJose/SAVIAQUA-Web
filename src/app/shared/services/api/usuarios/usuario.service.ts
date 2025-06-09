import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';

@Injectable({
	providedIn: 'root',
})
export class UsuarioService {
	constructor(
		private _http: HttpClient,
	) {}

	registrarNuevoUsuario(usuario: any) {
		return this._http.post<Result<any>>('usuarios', usuario);
	}

	obtenerUsuarios(filtros: any) {
		return this._http.get<Result<any[]>>('usuarios', {
			params: { ...filtros },
		});
	}
}
