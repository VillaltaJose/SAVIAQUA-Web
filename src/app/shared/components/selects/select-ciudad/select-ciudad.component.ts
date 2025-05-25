import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonSelect } from '../common-select';
import { LugarService } from 'src/app/shared/services/api/lugares/lugar.service';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-select-ciudad',
	templateUrl: './select-ciudad.component.html',
	styleUrls: ['./select-ciudad.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectCiudadComponent)
	}],
})
export class SelectCiudadComponent extends CommonSelect<number> {
	_codigoProvincia: number | null = null;

	@Input('codigoProvincia')
	set codigoProvincia(value: number | null) {
		console.log('Set codigoProvincia:', value);
		this._codigoProvincia = value;
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
		if (!this._codigoProvincia) {
			this.data = [];
			this.writeValue(null);
			return;
		}

		this.isLoading = true
		const subscription = this._lugarService.obtenerCiudades(this._codigoProvincia!)
		.pipe(finalize(() => {
			this.isLoading = false
			subscription.unsubscribe()
		}))
		.subscribe(api => this.data = api.value);
	}
}
