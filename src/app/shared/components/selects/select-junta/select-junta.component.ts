import { AfterViewInit, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonSelect } from '../common-select';
import { JuntaService } from 'src/app/shared/services/api/juntas/junta.service';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-select-junta',
	templateUrl: './select-junta.component.html',
	styleUrls: ['./select-junta.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: forwardRef(() => SelectJuntaComponent)
	}]
})
export class SelectJuntaComponent extends CommonSelect<number> implements AfterViewInit {
	@Input('showNull') mostrarNulo: boolean = false;
	data: any[] = [];
	isLoading: boolean = true;
	@Input('nzSize') size: 'default' | 'small' | 'large' = 'default';

	constructor(
		private _juntaService: JuntaService,
	) {
		super();
	}

	ngAfterViewInit(): void {
		this.obtenerDatos()
	}

	obtenerDatos() {
		this.isLoading = true

		const subscription = this._juntaService.obtenerJuntasMin()
		.pipe(finalize(() => {
			this.isLoading = false
			subscription.unsubscribe()
		}))
		.subscribe(api => this.data = api.value);
	}
}
