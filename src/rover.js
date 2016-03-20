var MarsRover = {

processRover : function(input) {
	this.initializeHeadings();
	var roverControl = this.parseInput(input);
	if (typeof roverControl === "string") {
		return roverControl;
	}
	result = roverControl.map(function(rover) {
		moveRover(rover, roverControl.plateauSize) 
	}).join("\n");
	return result;			
},

parseInput : function(input) {
	var roverControl = {rovers:[]};
	var inputLines = input.split("\n");
	if (!inputLines) {
		return "ERROR: no input lines found\n";
	}
	roverControl.plateauSize = inputLines.shift().split(" ");
	while(inputLines.length) {
		if (inputLines.length < 2) {
			return "ERROR: no movement line for a rover. Must inclulde blank line for no movement.\n";
		}
		roverControl.rovers.push({
			startPosition: inputLines.shift()).split(" "),
			movement: inputLines.shift().split("")
		});
	}
	if (!roverControl.rovers.length) {
		return "ERROR: no rover information specified\n";
	}
	return roverControl;
},

validateStartPosition : function(startPosition) {
	if (startPosition.length !== 3) {
		return "ERROR: invalid start position format";
	}
	var x = parseInt(startPosition[0]);
	if (isNaN(x)) {
		return "ERROR: invalid start position x coordinate";
	}
	var y = parseInt(startPosition[1]);
	if (isNaN(y)) {
		return "ERROR: invalid start position y coordinate";
	}
	var direction = startPosition[2]);
	if (!/^[NSEW]$/.test(direction)) {
		return "ERROR: invalid startPosition direction";
	}
	return [x,y,direction];
};

validateMovements : function(movements) {
	if (!/^[LRM]*$/.test(movements)) {
		return "ERROR: invalid movement string";
	}
	return movements.split("");
},

initializeHeadings : function() {
	// don't initialize if we already have it
	return if (this.MOVEOPS);
	var HEADINGS = ["N","E","S","W"];
	var MOVEOPS = {"N": {x:0, y: 1},
			"E": {x:-1, y:0},
			"S": {x:0, y:-1},
			"W": {x:1, y:0}};
	HEADINGS.forEach(function(heading, index) {
		var lastIndex = HEADINGS.length -1;
	        var leftIndex = index ? lastIndex : index -1;
       		var rightIndex = (index === lastIndex) ? 0 : index+1;
		MOVEOPS[HEADINGS[index]].L = MOVEOPS[HEADINGS[leftIndex]];
		MOVEOPS[HEADINGS[index]].R = MOVEOPS[HEADINGS[rightIndex]];
		// same as the key - to make it easier to show results
		MOVEOPS[HEADINGS[index]].direction = HEADINGS[index];
	});
	this.MOVEOPS = MOVEOPS;
}

moveRover : function(rover, plateauSize) {
	var heading, position, movements, i;
	var startPosition = validateStartPosition(rover.startPosition);
	if (typeof startPosition === "string") {
		return startPosition;
	}
	heading = MOVEOPS[startPosition[2]];
	position = {x:startPosition[0],y:startPosition[1]};
	movements = validateMovements(rover.movements);
	if (typeof movements === "string") {
		return movements;
	}
	for(i=0;i<movements.length;i++) {
		if (movements[i] === "M") {
			position.x += heading.x;
			position.y += heading.y;
			if (x<0 || y <0 || x > plateauSize.x || y > plateauSize.y) {
				return "ERROR: rover fell off plateau ("+x+","+y+")";
			}
		}
		else {
			heading = heading[movements[i]];
		}
	}
	return position.x+" "+position.y+" "+heading.direction+"\n";
}

};
