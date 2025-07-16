import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll/infinite-scroll.directive';
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Metadata } from 'src/app/models/result';
import { NotificacionService } from '../../services/api/notificaciones/notificacion.service';

@Component({
	selector: 'app-drawer-notificaciones',
	templateUrl: './drawer-notificaciones.component.html',
	styleUrls: ['./drawer-notificaciones.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		NzDrawerModule,
		NzIconModule,
		NzSpinModule,
		InfiniteScrollDirective,
	]
})
export class DrawerNotificacionesComponent implements OnInit {
	notificaciones: any[] = [];
	loading = true;

	meta?: Metadata = {
		pageSize: 1,
		totalCount: 1,
		totalPages: 1,
		currentPage: 1,
	};

	filtros: any = {
		pageNumber: 1,
		pageSize: 20,
	}

	constructor(
		private _nzDrawerRef: NzDrawerRef,
		private _notificacionService: NotificacionService,
		private _sanitizer: DomSanitizer,
	) { }

	ngOnInit(): void {
		this.obtenerNotificaciones(1, true);
	}

	abrirNotificacion(notificacion: any) {
		this._nzDrawerRef.close();
		this._notificacionService.abrirNotificacion(notificacion);
	}

	marcarNotificacionLeida(codigo: number) {
		this._notificacionService.marcarNotificacionLeida(codigo)
		.subscribe(() => {})
	}

	obtenerNotificaciones(page: number = 0, forced = false) {
		if (!forced && !this.meta?.hasNextPage) return;

		this.filtros.pageNumber = page;

		this.loading = true;
		this._notificacionService.obtenerNotificaciones(this.filtros.pageSize, this.filtros.pageNumber)
		.pipe(finalize(() => {
			setTimeout(() => {
				this.loading = false
			}, 250)
		}))
		.subscribe(api => {
			this.meta = api.metadata;
			this.filtros.pageNumber++;

			// api.value.forEach((n: any) => {
			// 	n.Descripcion = this.setHtmlTemplate(n);
			// });

			this.notificaciones = [...this.notificaciones, ...api.value];
		})
	}
}
