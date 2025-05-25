import { AfterViewInit, Component, forwardRef, Input } from '@angular/core';
import { CommonSelect } from '../common-select';
import { finalize } from 'rxjs';
import { LugarService } from 'src/app/shared/services/api/lugares/lugar.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-select-provincia',
	templateUrl: './select-provincia.component.html',
	styleUrls: ['./select-provincia.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectProvinciaComponent)
	}]
})
export class SelectProvinciaComponent extends CommonSelect<number> implements AfterViewInit {
	@Input('showNull') mostrarNulo: boolean = false;
	data: any[] = [];
	isLoading: boolean = true;
	@Input('nzSize') size: 'default' | 'small' | 'large' = 'default';

	constructor(
		private _lugarService: LugarService,
	) {
		super();
	}

	ngAfterViewInit(): void {
		this.obtenerDatos()
	}

	obtenerDatos() {
		this.isLoading = true

		const subscription = this._lugarService.obtenerProvincias()
		.pipe(finalize(() => {
			this.isLoading = false
			subscription.unsubscribe()
		}))
		.subscribe(api => this.data = api.value);
	}

}
