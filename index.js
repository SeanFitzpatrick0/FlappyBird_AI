// Define titles and details
var trained_bird_info = {
	title: "Trained Bird",
	description:
		"This was the best preforming bird after training for <b>15 generations</b>. It is capable of navigating the environment without hitting any pipes."
};
var view_training_info = {
	title: "Training",
	description:
		"This shows the training process for this AI. Each generation creates a populations of birds try navigate the environment. The best preforming birds have a grater chance to be included in the next generation. The birds in the next generation are  then altered slightly to create new behavior."
};

// set initial description
set_description(trained_bird_info.title, trained_bird_info.description);

// Add event listeners for buttons
var trained_bird_button = document.getElementById("trained_bird_button");
var view_training_button = document.getElementById("view_training_button");

trained_bird_button.addEventListener("click", e => {
	if (e.target.classList.contains("btn-primary")) return;
	// Swap button classes
	swap_active_button(trained_bird_button, view_training_button);
	// Rest sketch
	reset_sketch(true);
	// Set info
	set_description(trained_bird_info.title, trained_bird_info.description);
});

view_training_button.addEventListener("click", e => {
	if (e.target.classList.contains("btn-primary")) return;
	// Swap button classes
	swap_active_button(view_training_button, trained_bird_button);
	// Rest sketch
	reset_sketch(false);
	// Set info
	set_description(view_training_info.title, view_training_info.description);
});

function reset_sketch(only_trained_bird) {
	// Remove old slider
	document.getElementById("speed_slider_container").innerHTML = "";
	// ReCreate canvas
	setup(only_trained_bird);
}

function swap_active_button(active_button, inactive_button) {
	active_button.classList.remove("btn-secondary");
	active_button.classList.add("btn-primary");
	inactive_button.classList.remove("btn-primary");
	inactive_button.classList.add("btn-secondary");
}

function set_description(title, description) {
	document.getElementById("game_title").innerHTML = title;
	document.getElementById("game_description").innerHTML = description;
}
