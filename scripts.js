//variables
var colors = []; 
var numSquares = 6; // keeps track of difficulty and # of squares displayed on screen
var pickedColor;
var chances = 3; // keeps track of # of chances left

//selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector(".message--red");
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
				messageDisplay.textContent = "You got it!";
				resetButton.textContent = "Play Again?"
				h1.style.backgroundColor = clickedColor;
				changeColors(clickedColor);
			} else {
				this.style.backgroundColor = "#dddddd";
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
			modeButtons[2].classList.remove("selected");
			modeButtons[3].classList.remove("selected"); // remove this if it doesn't work
			this.classList.add("selected");
			// this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			switch(this.textContent) {
				case 'Easy':
					numSquares = 3;
					break;
				case 'Hard':
					numSquares = 6;
					break;
				case 'Expert':
					numSquares = 9;
					break;
				case 'Infernal':
					numSquares = 12;
					break;
				default:
					numSquares = 6;
			}
			console.log("numSquares = " + numSquares);
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

	// infernal mode here
	if (numSquares > 9) {
		infernalColor();
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

//===== FUNCTION - generate similar shades close to randomColor result
function shadeRGBColor(color, percent) {
  let f = color.split(",");
  let t = percent < 0 ? 0 : 255;
  let p = percent < 0 ? percent *-1 : percent;
  let R=parseInt(f[0].slice(4));
  let G=parseInt(f[1]);
  let B=parseInt(f[2]);
  return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

//===== FUNCTION - shuffles the order of elements in array
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const infernalColor = () => {
  let color1 = randomColor();
  let colorArrayInfernal = [];
  colorArrayInfernal.push(color1);
  for (let i = -0.8; i < 0.8; i+=0.15) {
    colorArrayInfernal.push(shadeRGBColor(color1, i));
  };
	shuffle(colorArrayInfernal);
	pickedColor = color1;
	console.log(colorArrayInfernal);
	console.log("pickedColor", pickedColor);
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	h1.style.backgroundColor = "#008A6B";
	for(i = 0; i < squares.length; i++) {
		if(colorArrayInfernal[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colorArrayInfernal[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}