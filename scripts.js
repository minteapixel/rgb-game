//variables
var colors = []; 
var numSquares = 6; // keeps track of difficulty and # of squares displayed on screen
var pickedColor;

//selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

//initial function on page load
function init() {
	setModeButtons();
	setSquares();
	reset();
}

// add click listeners to squares
function setSquares() {
	for (i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			console.log(clickedColor, pickedColor);
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				h1.style.backgroundColor = clickedColor;
				changeColors(clickedColor);
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

//mode buttons functionality
function setModeButtons() {
	for(var i=0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click",function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			reset();
		});
	}
}

resetButton.addEventListener("click", function() {
	reset();
});

//reset functionality
function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	h1.style.backgroundColor = "#008A6B";
	for(i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

// changes all squares to the correct colored square
function changeColors(color) {
	for(i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

// picks a random color (goes into the header span) - is the correct color answer
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// generate random colors
function generateRandomColors(num) {
	var arr = [];
	for (i = 0; i < num; i++) {
		// get random color and push into array
		arr.push(randomColor());
	}
	return arr;
}

// creates random color for squares
function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g +", " + b +")";
}