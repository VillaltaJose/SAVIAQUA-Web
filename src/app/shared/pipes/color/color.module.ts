import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPipe } from './color.pipe';

@NgModule({
	declarations: [ColorPipe],
	exports: [ColorPipe],
	imports: [CommonModule],
})
export class ColorModule {}
