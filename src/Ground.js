class Ground {
	constructor() {
		this.height = 10;
	}

	draw() {
		fill('#ECC451');
		rect(0, HEIGHT - this.height, WIDTH, this.height);
	}
}
