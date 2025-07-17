import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Message, Result } from 'src/app/models/result';
import { AuthService } from 'src/app/shared/services/api/auth/auth.service';
import { LocalStorageService, StorageKeys } from 'src/app/shared/services/local-storage/local-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	loading: boolean = false;
	formLogin: FormGroup;
	errors: Message[] = [];

	constructor(
		private _authService: AuthService,
		private _router: Router,
		private _storageService: LocalStorageService,
		private _activatedRoute: ActivatedRoute,
	) {
		this.formLogin = new FormGroup({
			correo: new FormControl('', [Validators.required]),
			clave: new FormControl('', [Validators.required]),
		});
	}

	iniciarSesion() {
		if (this.formLogin.invalid) {
			this.formLogin.markAllAsTouched();
			return;
		}

		this.errors = [];

		this.loading = true;

		const data = this.formLogin.getRawValue();
		data.correo = data.correo.trim().toLowerCase();

		this._authService.login(data)
		.pipe(finalize(() => this.loading = false))
		.subscribe(api => {
			this._storageService.setStorage(StorageKeys.SESSION, api.value);

			if (this._activatedRoute.snapshot.queryParams['redirect']) {
				window.location.href = this._activatedRoute.snapshot.queryParams['redirect'];
				return;
			}

			this._router.navigate(['/pozos']);
		}, (err: Result<void>) => {
			this.errors = err.messages;
		})
	}
}
