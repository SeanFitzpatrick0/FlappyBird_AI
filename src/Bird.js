class Bird {
	constructor(brain) {
		// Position
		this.y = height / 2;
		this.x = 64;
		this.width = 42;

		// Movement variables
		this.gravity = 0.8;
		this.lift = -12;
		this.velocity = 0;

		// Fitness
		this.fitness = 0;

		// Set Brain
		if (brain) {
			this.brain = brain.copy();
		} else {
			this.brain = new Brain(5, 8, 2);
		}
	}

	/* RENDER FUNCTIONS */
	draw() {
		push();
		translate(this.x + this.width / 2, this.y + this.width / 2);
		rotate(this.get_angle(this.velocity));
		image(
			BIRD_IMG,
			-this.width / 2,
			-this.width / 2,
			this.width,
			this.width
		);
		pop();
	}

	/* MOVEMENT FUNCTIONS */
	move() {
		// Update fitness
		this.fitness++;

		// Move position
		this.velocity += this.gravity;
		this.y += this.velocity;
	}

	hit(environment) {
		// Hit Roof or Ground
		if (
			this.y + this.width > HEIGHT - environment.ground.height ||
			this.y < 0
		)
			return true;

		// Hit pipe
		for (var i = 0; i < environment.pipes.length; i++) {
			var pipe = environment.pipes[i];
			if (
				(this.y < pipe.top ||
					this.y + this.width > HEIGHT - pipe.bottom) &&
				(this.x + this.width > pipe.x && this.x < pipe.x + pipe.width)
			)
				return true;
		}

		return false;
	}

	get_angle(velocity) {
		return map(velocity, -5, 5, -60, 60, true);
	}

	/* BRAIN FUNCTIONS */
	dispose() {
		this.brain.dispose();
	}

	flap() {
		this.velocity += this.lift;
	}

	mutate(mutation_rate) {
		this.brain.mutate(mutation_rate);
	}

	act(pipes) {
		// Find the closest pipe
		let closest_pipe = null;
		let closest_pipe_distance = Infinity;
		pipes.forEach(pipe => {
			let d = pipe.x + pipe.width - this.x;
			if (d < closest_pipe_distance && d > 0) {
				closest_pipe = pipe;
				closest_pipe_distance = d;
			}
		});

		// Get inputs
		let inputs = [
			this.y / height,
			closest_pipe.top / height,
			closest_pipe.bottom / height,
			closest_pipe.x / width,
			this.velocity / 10
		];

		// Make prediction
		let output = this.brain.predict(inputs);
		if (output[0] > output[1]) this.flap();
	}
}
