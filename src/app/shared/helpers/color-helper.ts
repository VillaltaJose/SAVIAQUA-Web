export type ColorTone = 'light' | 'dark' | 'pastel' | undefined;

export function stringToColor(
	seed: string,
	tone: ColorTone = undefined
): string {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = seed.charCodeAt(i) + ((hash << 5) - hash);
	}

	let r = (hash >> 0) & 0xff;
	let g = (hash >> 8) & 0xff;
	let b = (hash >> 16) & 0xff;

	switch (tone) {
		case 'light':
			// Aumenta cada componente hacia 192-255 (brillo alto, pero no blanco puro)
			r = 192 + (r % 64);
			g = 192 + (g % 64);
			b = 192 + (b % 64);
			break;

		case 'dark':
			// Limita cada componente a 0–128 (brillo bajo)
			r = r % 128;
			g = g % 128;
			b = b % 128;
			break;

		case 'pastel':
			// Mezcla un color base con blanco (más saturado que light)
			r = Math.floor((r % 128) + 127 + 64) / 2;
			g = Math.floor((g % 128) + 127 + 64) / 2;
			b = Math.floor((b % 128) + 127 + 64) / 2;
			break;

		default:
			// Nada, usa RGB original tal cual
			break;
	}

	return `#${[r, g, b]
		.map((v) => Math.round(v).toString(16).padStart(2, '0'))
		.join('')}`;
}
