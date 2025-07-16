import { Component, OnInit } from '@angular/core';
import { LocalStorageService, StorageKeys } from '../../services/local-storage/local-storage.service';
import { NotificacionService } from '../../services/api/notificaciones/notificacion.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { DrawerNotificacionesComponent } from '../drawer-notificaciones/drawer-notificaciones.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	session: any | null = null;
	pageSize: number = 20;
	pageNumber: number = 1;

	notificaciones: any[] = [];
	totalNoLeidas: number = 0;

	constructor(
		private _storageService: LocalStorageService,
		private _notificacionService: NotificacionService,
		private _nzDrawer: NzDrawerService,
	) {
		this.session = this._storageService.getStorage(StorageKeys.SESSION)?.perfilUsuario;
	}

	ngOnInit() {
		this.obtenerTotalNoLeidas();
	}

	obtenerTotalNoLeidas() {
		this._notificacionService.totalNotificaciones$
		.subscribe(total => {
			this.totalNoLeidas = total;
		});
	}

	abrirDrawerNotificaciones() {
		this._nzDrawer.create({
			nzContent: DrawerNotificacionesComponent,
			nzWidth: '450px',
			nzClosable: false,
			nzBodyStyle: {
				padding: '0'
			}
		})
	}

}
