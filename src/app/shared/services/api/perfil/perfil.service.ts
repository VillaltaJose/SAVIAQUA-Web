import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';

@Injectable({
	providedIn: 'root',
})
export class PerfilService {
	constructor(
		private _http: HttpClient,
	) {}

	obtenerPerfil() {
		return this._http.get<Result<any>>('perfil');
	}

	actualizarPerfil(perfil: any) {
		return this._http.put<Result<boolean>>('perfil', perfil);
	}

	actualizarClave(claves: any) {
		return this._http.put<Result<boolean>>('perfil/clave', claves);
	}
}
