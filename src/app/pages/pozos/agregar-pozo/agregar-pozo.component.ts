import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { finalize } from 'rxjs';
import { Message, Result } from 'src/app/models/result';
import { PozoService } from 'src/app/shared/services/api/pozos/pozo.service';

@Component({
	selector: 'app-agregar-pozo',
	templateUrl: './agregar-pozo.component.html',
	styleUrls: ['./agregar-pozo.component.scss'],
})
export class AgregarPozoComponent implements AfterViewInit {
	form: FormGroup;
	showMap: boolean = true;

	@ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>;
	zoom = 15;
	center = { lat: -2.90055, lng: -79.00453 };

	loading = {
		crear: false,
	}

	errors: Message[] = [];

	constructor(
		private _nzDrawerRef: NzDrawerRef,
		private _cdr: ChangeDetectorRef,
		private _pozoService: PozoService,
	) {
		this.form = new FormGroup({
			codigoJunta: new FormControl(null, []),
			codigoProvincia: new FormControl(null, [Validators.required]),
			codigoCiudad: new FormControl(null, [Validators.required]),
			codigoParroquia: new FormControl(null, [Validators.required]),
			nombre: new FormControl(null, [Validators.required]),
			latitude: new FormControl(null, [Validators.required]),
			longitude: new FormControl(null, [Validators.required]),
			observaciones: new FormControl(null, []),
		});
	}

	ngAfterViewInit(): void {
		const input = this.searchBox.nativeElement;
		const autocomplete = new google.maps.places.Autocomplete(input);

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			if (!place.geometry) return;

			this.center = {
				lat: place.geometry.location?.lat() || 0,
				lng: place.geometry.location?.lng() || 0
			};

			this.agregarMarcador({ latLng: place.geometry.location });
			this._cdr.detectChanges();
		});
	}

	cerrarDrawer() {
		this._nzDrawerRef.close();
	}

	agregarMarcador(event: google.maps.MapMouseEvent | any) {
		if (!event.latLng) return;

		const coords = event.latLng.toJSON();

		this.form.patchValue({
			latitude: coords.lat,
			longitude: coords.lng,
		});
	}

	crearPozo() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.errors = [
				{
					text: 'Por favor, complete todos los campos requeridos.',
				},
			];
			return;
		}

		this.errors = [];
		this.loading.crear = true;
		this.form.disable();

		const data = this.form.getRawValue();

		this._pozoService.crearPozo(data)
		.pipe(finalize(() => {
			this.loading.crear = false;
			this.form.enable();
		}))
		.subscribe(api => {
			this._nzDrawerRef.close(api.value);
		}, (error: Result<void>) => {
			this.errors = error.messages;
		});
	}

}
