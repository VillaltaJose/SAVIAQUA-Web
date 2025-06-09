import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { finalize } from 'rxjs';
import { Message, Result } from 'src/app/models/result';
import { JuntaService } from 'src/app/shared/services/api/juntas/junta.service';

@Component({
	selector: 'app-agregar-junta',
	templateUrl: './agregar-junta.component.html',
	styleUrls: ['./agregar-junta.component.scss'],
})
export class AgregarJuntaComponent {
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
		private _juntaService: JuntaService,
	) {
		this.form = new FormGroup({
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

	crearJunta() {
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
		console.log(data);

		this._juntaService.crearJunta(data)
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
