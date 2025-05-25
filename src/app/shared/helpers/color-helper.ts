export function stringToColor(seed: string): string {
	let hash = 0;

	for (let i = 0; i < seed.length; i++) {
		hash = seed.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		color += value.toString(16).padStart(2, '0');
	}

	return color;
}
