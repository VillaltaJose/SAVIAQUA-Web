import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private _http: HttpClient,
		private _storage: LocalStorageService,
		private _route: Router,
		private _nzModalService: NzModalService,
	) {}

	login(data: any) {
		return this._http.post<Result<any>>('autenticacion', data);
	}

	refreshToken() {
		return this._http.put<Result<any>>('autenticacion', {});
	}

	logOut(redirect: boolean = true) {
		this._nzModalService.closeAll();
		this._storage.clearAll();

		if (!redirect) {
			this._route.navigate(['/login']);

			return;
		}

		this._route.navigate(['/login'], {
			queryParams: {
				redirect: window.location,
			}
		});
	}
}
