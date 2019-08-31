class Brain {
	constructor(a, b, c, d) {
		if (a instanceof tf.Sequential) {
			// Set given model
			this.model = a;
			this.input_nodes = b;
			this.hidden_nodes = c;
			this.output_nodes = d;
		} else {
			// Create new model
			this.input_nodes = a;
			this.hidden_nodes = b;
			this.output_nodes = c;
			this.model = this.create_model();
		}
	}

	create_model() {
		const model = tf.sequential({
			layers: [
				tf.layers.dense({
					units: this.hidden_nodes,
					inputShape: [this.input_nodes],
					activation: 'sigmoid'
				}),
				tf.layers.dense({
					units: this.output_nodes,
					activation: 'softmax'
				})
			]
		});
		return model;
	}

	copy() {
		return tf.tidy(() => {
			const model_copy = this.create_model();
			const weights = this.model.getWeights();
			const weight_copies = weights.map(weight => weight.clone());
			model_copy.setWeights(weight_copies);
			return new Brain(
				model_copy,
				this.input_nodes,
				this.hidden_nodes,
				this.output_nodes
			);
		});
	}

	mutate(mutation_rate) {
		tf.tidy(() => {
			const weights = this.model.getWeights();
			const mutated_weights = weights.map(tensor => {
				let shape = tensor.shape;
				let values = tensor.dataSync().slice();
				let mutated_values = values.map(value => {
					if (random(1) < mutation_rate)
						value = value + randomGaussian();
					return value;
				});

				let mutated_tensor = tf.tensor(mutated_values, shape);
				return mutated_tensor;
			});

			this.model.setWeights(mutated_weights);
		});
	}

	dispose() {
		this.model.dispose();
	}

	predict(inputs) {
		return tf.tidy(() => {
			inputs = tf.tensor2d([inputs]);
			let outputs = this.model.predict(inputs);
			outputs = outputs.dataSync();
			return outputs;
		});
	}
}
