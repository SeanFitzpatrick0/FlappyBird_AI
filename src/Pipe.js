class Pipe {
	constructor() {
		this.spacing = 125;
		this.top = random(HEIGHT / 6, (3 / 4) * HEIGHT);
		this.bottom = HEIGHT - (this.top + this.spacing);
		this.x = WIDTH;
		this.width = 80;
		this.speed = 6;
	}

	draw() {
		fill(255);
		rectMode(CORNER);
		// Bottom Pipe
		image(PIPE_IMG, this.x, HEIGHT - this.bottom, this.width, this.bottom);

		// Top Pipe
		push();
		translate(this.x + this.width, this.top);
		rotate(180);
		image(PIPE_IMG, 0, 0, this.width, this.top);
		pop();
	}

	move() {
		this.x -= this.speed;
	}

	is_offscreen() {
		return this.x < -this.width;
	}
}
