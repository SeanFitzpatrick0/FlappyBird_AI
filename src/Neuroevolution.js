class Neuroevolution {
	static create_next_generation(population, mutation_rate) {
		// Evaluate population
		let fitnesses = this._calculate_fitness(population);

		// Select and Mutate next generation
		let next_generation = [];
		for (let i = 0; i < population.length; i++) {
			let child = this._select_agent(fitnesses, population).brain;
			child.mutate(mutation_rate);
			next_generation.push(new Bird(child));
		}

		return next_generation;
	}

	static _select_agent(fitnesses, population) {
		let index = 0;
		let r = random(1);
		while (r > 0) {
			r = r - fitnesses[index];
			index++;
		}
		index--;
		return population[index];
	}

	static _calculate_fitness(population) {
		// Get fitnesses
		let fitnesses = population.map(agent => agent.fitness);
		// Normalize fitnesses
		let fitnesses_sum = fitnesses.reduce((a, b) => a + b, 0);
		fitnesses = fitnesses.map(fitness => fitness / fitnesses_sum);
		return fitnesses;
	}
}
