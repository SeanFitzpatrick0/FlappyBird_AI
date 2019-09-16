const MUTATION_RATE = 0.1;

class Population {
	constructor(population_size, only_trained) {
		this.generation_count = 1;
		this.birds = [];
		this.dead_birds = [];
		this.only_trained = only_trained;
		this.generation_label_position = {
			x: WIDTH - 150,
			y: 30
		};

		if (this.only_trained) {
			this.load_trained_bird().then(res => this.birds.push(res));
		} else {
			for (let i = 0; i < population_size; i++) {
				this.birds[i] = new Bird();
			}
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
			this.generation_count++;
			let next_generation = Neuroevolution.create_next_generation(
				population.dead_birds,
				MUTATION_RATE
			);
			this.birds = next_generation;
			console.log(`Generation: ${this.generation_count}`);

			// Clean up previous generation
			this.dead_birds.forEach(bird => bird.dispose());
			this.dead_birds = [];

			environment.reset();
		}
	}

	draw() {
		this.birds.forEach(bird => bird.draw());

		// Generation Label
		if (!this.only_trained) {
			fill(0);
			textSize(20);
			text(
				`Generation: ${this.generation_count}`,
				this.generation_label_position.x,
				this.generation_label_position.y
			);
		}
	}

	async load_trained_bird() {
		// Load model
		let trained_model = await tf.loadLayersModel(
			"./data/FlappyBirdAI_Trained_Bird.json"
		);
		// Create Brain
		let trained_brain = new Brain(trained_model, 5, 8, 2);
		// Create Bird
		let trained_bird = new Bird(trained_brain);
		return trained_bird;
	}
}
