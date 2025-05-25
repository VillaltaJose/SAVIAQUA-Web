import { Pipe, PipeTransform } from '@angular/core';
import { stringToColor } from '../../helpers/color-helper';

@Pipe({
	name: 'color',
})
export class ColorPipe implements PipeTransform {
	transform(seed: string): string {
		return stringToColor(seed);
	}
}
