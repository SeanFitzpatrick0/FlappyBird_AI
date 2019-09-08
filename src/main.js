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
	tf.setBackend("cpu");

	// Load assets
	BACKGROUND_IMG = loadImage("images/background.png");
	PIPE_IMG = loadImage("images/pipe.png");
	BIRD_IMG = loadImage("images/bird.png");

	// Create agents
	population = new Population(POPULATION_SIZE);
	environment = new Environment();

	var canvas = createCanvas(WIDTH, HEIGHT);
	canvas.parent("canvas_container");
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

// User Interactions
async function keyPressed() {
	if (key === "s") {
		let bird = population.birds[0];
		const _ = await bird.brain.model.save(
			'downloads://FlappyBirdAI_Trained_Bird');
	}
}

// To load trained bird
// trained_model = trained = await tf.loadLayersModel('http://127.0.0.1:5500/data/FlappyBirdAI_Trained_Bird.json');
