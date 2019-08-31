class Environment {
	constructor() {
		this.pipes = [];
		this.new_pipe_counter = 0;
		this.ground = new Ground();
	}

	move() {
		// Enter new pipe
		if (this.new_pipe_counter % PIPE_BUFFER == 0) {
			this.pipes.push(new Pipe());
		}
		this.new_pipe_counter++;

		// Move Pipes
		this.pipes.forEach(pipe => pipe.move());

		// Remove is_offscreen pipes
		this.pipes.forEach((pipe, i) => {
			if (pipe.is_offscreen()) this.pipes.splice(i, 1);
		});
	}

	reset() {
		this.pipes = [];
		this.new_pipe_counter = 0;
	}

	draw() {
		this.pipes.forEach(pipe => pipe.draw());
		this.ground.draw();
	}
}
