import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthInterceptorsService } from './shared/services/interceptors/auth-interceptor.service';
import * as echarts from 'echarts/core';
import { NgxEchartsModule } from 'ngx-echarts';

echarts.use([]);

registerLocaleData(es);

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		NgxEchartsModule.forRoot({ echarts }),
		BrowserAnimationsModule,
	],
	providers: [
		NzModalService,
		NzDrawerService,
		NzMessageService,
		{ provide: LOCALE_ID, useValue: 'es' },
		{ provide: NZ_I18N, useValue: es_ES },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorsService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
