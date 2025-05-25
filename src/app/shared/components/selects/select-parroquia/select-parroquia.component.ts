import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonSelect } from '../common-select';
import { finalize } from 'rxjs';
import { LugarService } from 'src/app/shared/services/api/lugares/lugar.service';

@Component({
	selector: 'app-select-parroquia',
	templateUrl: './select-parroquia.component.html',
	styleUrls: ['./select-parroquia.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectParroquiaComponent)
	}],
})
export class SelectParroquiaComponent extends CommonSelect<number> {
	_codigoProvincia: number | null = null;
	@Input('codigoProvincia')
	set codigoProvincia(value: number | null) {
		this._codigoProvincia = value;
		this.obtenerDatos();
	}

	_codigoCiudad: number | null = null;
	@Input('codigoCiudad')
	set codigoCiudad(value: number | null) {
		this._codigoCiudad = value;
		this.obtenerDatos();
	}

	@Input('showNull') mostrarNulo: boolean = false;
	@Input('nzSize') size: 'default' | 'small' | 'large' = 'default';

	data: any[] = [];
	isLoading: boolean = false;

	constructor(
		private _lugarService: LugarService,
	) {
		super();
	}

	obtenerDatos() {
		if (!this._codigoProvincia || !this._codigoCiudad) {
			this.data = [];
			this.writeValue(null);
			return;
		}

		this.isLoading = true
		const subscription = this._lugarService.obtenerParroquias(
			this._codigoProvincia!,
			this._codigoCiudad!,
		)
		.pipe(finalize(() => {
			this.isLoading = false
			subscription.unsubscribe()
		}))
		.subscribe(api => this.data = api.value);
	}
}
