import { Component } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
	selector: 'app-agregar-pozo',
	templateUrl: './agregar-pozo.component.html',
	styleUrls: ['./agregar-pozo.component.scss'],
})
export class AgregarPozoComponent {
	constructor(
		private _nzDrawerRef: NzDrawerRef,
	) { }

	cerrarDrawer() {
		this._nzDrawerRef.close();
	}
}
