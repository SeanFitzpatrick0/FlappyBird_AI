const MUTATION_RATE = 0.1;

class Population {
	constructor(population_size) {
		this.generation = 1;
		this.birds = [];
		this.dead_birds = [];

		for (let i = 0; i < population_size; i++) {
			this.birds[i] = new Bird();
		}
	}

	move(environment) {
		// Check for collision
		this.birds.forEach((bird, i) => {
			if (bird.hit(environment)) {
				this.dead_birds.push(this.birds.splice(i, 1)[0]);
			}
		});

		// Act and Move
		this.birds.forEach(bird => {
			bird.act(environment.pipes);
			bird.move();
		});

		// Generate Next Generation
		if (this.birds.length === 0) {
			// Create next generation
			let next_generation = Neuroevolution.create_next_generation(
				population.dead_birds,
				MUTATION_RATE
			);
			this.birds = next_generation;

			// Clean up previous generation
			this.dead_birds.forEach(bird => bird.dispose());
			this.dead_birds = [];

			environment.reset();
		}
	}

	draw() {
		this.birds.forEach(bird => bird.draw());
	}
}
