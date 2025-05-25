import { Component } from '@angular/core';
import { AuthService } from '../../services/api/auth/auth.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
	constructor(
		private _authService: AuthService,
	) {}

	logOut() {
		this._authService.logOut();
	}
}
