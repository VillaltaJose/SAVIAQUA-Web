import { Pipe, PipeTransform } from '@angular/core';
import { ColorTone, stringToColor } from '../../helpers/color-helper';

@Pipe({
	name: 'color',
})
export class ColorPipe implements PipeTransform {
	transform(seed: string, tone?: ColorTone): string {
		return stringToColor(seed, tone);
	}
}
