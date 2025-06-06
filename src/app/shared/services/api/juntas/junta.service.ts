import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';

@Injectable({
	providedIn: 'root',
})
export class JuntaService {
	constructor(
		private _http: HttpClient,
	) {}

	obtenerJuntasMin() {
		return this._http.get<Result<any[]>>(`juntas?minified=true`);
	}
}
