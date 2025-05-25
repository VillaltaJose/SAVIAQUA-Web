import { Component } from '@angular/core';
import { LocalStorageService, StorageKeys } from '../../services/local-storage/local-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	session: any | null = null;

	constructor(
		private _storageService: LocalStorageService
	) {
		this.session = this._storageService.getStorage(StorageKeys.SESSION)?.perfilUsuario;
	}

}
