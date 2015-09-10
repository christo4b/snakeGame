jQuery(document).ready(function(){
	//We're using a canvas element, which does not have any drawing properties of its own. 
	//Therefore, we need to use JS to script the drawing.
	//get the snake-game canvas element via jQ
	// whenevr we're doing somethign with the canvas, 
	//we're actually drawing on the context of that canvas
	//not the canvas itself. so we need a variable to hold the context. 
	var snakeCanvas = $('canvas.snake-game')[0],
		context 	= snakeCanvas.getContext('2d'),
		width 		= snakeCanvas.width,
		height 		= snakeCanvas.height,
		direction =	'down',
		snakeSize	= 10;
	var snake = [
		{'x':0, 'y':0},
		{'x':1, 'y':0},
		{'x':2, 'y':0},
		{'x':3, 'y':0},
		{'x':4, 'y':0},
		{'x':5, 'y':0}
	];

	//We will re-draw the entire canvas every 15ms and at every re-draw, update the coordinates of the snake
	var gameLoop = setInterval(reDraw, 100);  //setInterval() repeatedly executes a function at specified time intervals

	function reDraw(){ //create reDraw function to be used in gameLoop. invokes drawing of BG and of Snake
		console.log('redrawing');
		drawBg();
		drawSnake(snake);
	}

	function drawBg(){
		paint(0,0, width, height, 'grey', 'black');
	}

	function drawSnake (snakeInput) {
		//use a forEach loop and pass it function forEach element, 
		//invoke the paint function, using bracket notation to pull the x and y values
		updateSnake(snakeInput);
		snakeInput.forEach(function(element){
			paint(element['x']*10, element['y']*10, snakeSize, snakeSize, 'orange', 'black');
		});
	}

	function paint(x, y, w, h, backgroundColor, borderColor){
		context.fillStyle = backgroundColor; //sets the color, gradient, or pattern used to fill the drawing.
		context.fillRect(x,y,w,h); //The fillRect() method draws a "filled" rectangle. http://www.w3schools.com/tags/canvas_fillrect.asp
		context.strokeStyle = borderColor;
		context.strokeRect(x,y,w,h);
	}
	function updateSnake(snakeInput){
		snakeInput.shift();
		snakeInput.push(updateDirection(snakeInput, direction));
	}

	function updateDirection(snakeInput, direction){
		var cellX = snakeInput[snakeInput.length-1].x,
				cellY = snakeInput[snakeInput.length-1].y;
		
		if (direction === 'right') {
			cellX += 1;
		} else if (direction === 'left') {
			cellX -= 1;
		} else if (direction === 'up') {
			cellY -= 1;
		} else if (direction === 'down') {
			cellY += 1;
		} 
		return {'x':cellX, 'y':cellY};
	}
	
	
	$(document).on('keydown', function(event){ //on keydown we invoke function
		var key = event.which; // event.which will return the specific key or button pressed and set it to var key
			switch(key) {
				case 37: // if var key is 37, and if direction is not moving right, direction assigned to left
					if (direction != 'right') { direction = 'left';}
					break;
				case 38: //up key
					if (direction != 'down') { direction = 'up'; }
					break;
				case 39: // right key
					if (direction != 'left') { direction = 'right'; }
					break;
				case 40: // key down
					if (direction != 'up') { direction = 'down'; }
					break;
			}
	});


});














