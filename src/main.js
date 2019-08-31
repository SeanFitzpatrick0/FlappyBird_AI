// GLOBAL CONSTANTS
const WIDTH = 700;
const HEIGHT = 400;
const POPULATION_SIZE = 250;
const PIPE_BUFFER = 75;

// IMAGES
let BACKGROUND_IMG;
let PIPE_IMG;
let BIRD_IMG;

// AGENTS
let population;
let environment;

// SPEED SLIDER
let slider;

function setup() {
	// Setup Modes
	angleMode(DEGREES);
	tf.setBackend('cpu');

	// Load assets
	BACKGROUND_IMG = loadImage('images/background.png');
	PIPE_IMG = loadImage('images/pipe.png');
	BIRD_IMG = loadImage('images/bird.png');

	// Create agents
	population = new Population(POPULATION_SIZE);
	environment = new Environment();

	createCanvas(WIDTH, HEIGHT);
	slider = createSlider(1, 10, 1);
}

function draw() {
	// Move N cycles before render
	for (let n = 0; n < slider.value(); n++) {
		environment.move();
		population.move(environment);
	}

	// Render
	background(BACKGROUND_IMG);
	population.draw();
	environment.draw();
}

function keyPressed() {
	if (key === 'S') {
		let bird = birds[0];
		saveJSON(bird.brain, 'bird.json');
	}
}
