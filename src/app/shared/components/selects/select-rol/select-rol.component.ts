import { AfterViewInit, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonSelect } from '../common-select';
import { RolService } from 'src/app/shared/services/api/roles/rol.service';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-select-rol',
	templateUrl: './select-rol.component.html',
	styleUrls: ['./select-rol.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectRolComponent)
	}],
})
export class SelectRolComponent extends CommonSelect<number> implements AfterViewInit {
	@Input('showNull') mostrarNulo: boolean = false;
	data: any[] = [];
	isLoading: boolean = true;
	@Input('nzSize') size: 'default' | 'small' | 'large' = 'default';

	constructor(
		private _rolService: RolService,
	) {
		super();
	}

	ngAfterViewInit(): void {
		this.obtenerDatos()
	}

	obtenerDatos() {
		this.isLoading = true

		const subscription = this._rolService.obtenerRoles()
		.pipe(finalize(() => {
			this.isLoading = false
			subscription.unsubscribe()
		}))
		.subscribe(api => this.data = api.value);
	}
}
