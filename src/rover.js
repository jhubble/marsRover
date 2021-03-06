var MarsRover = {

    processRover: function(input) {
        this.initializeHeadings();
        var that = this;
        var roverControl = this.parseInput(input);
        if (typeof roverControl === "string") {
            return roverControl;
        }
        result = roverControl.rovers.map(function(rover) {
            return that.moveRover(rover, roverControl.plateauSize)
        }).join("\n");
        return result;
    },

    parseInput: function(input) {
        var roverControl = {
            rovers: []
        };
        var inputLines = input.split("\n");
        if (!inputLines) {
            return "ERROR: no input lines found";
        }
        // Get integers from plateau size and filter out any NaNs or 0s
        var plateauSize = inputLines.shift().split(" ").map(function(n) {
            return parseInt(n)
        }).filter(Boolean);
        if (plateauSize.length != 2) {
            return "ERROR: invalid plateau size\n";
        }
        roverControl.plateauSize = {
            x: plateauSize[0],
            y: plateauSize[1]
        };

        while (inputLines.length) {
            if (inputLines.length < 2) {
                // don't worry about extra blank line
                if (/^\s*$/.test(inputLines.shift())) {
                    continue;
                } else {
                    return "ERROR: no movement line for a rover. Must inclulde blank line for no movement.";
                }
            }
            roverControl.rovers.push({
                startPosition: inputLines.shift().split(" "),
                movements: inputLines.shift()
            });
        }
        if (!roverControl.rovers.length) {
            return "ERROR: no rover information specified";
        }
        return roverControl;
    },

    validateStartPosition: function(startPosition) {
        var x = parseInt(startPosition[0]);
        if (isNaN(x)) {
            return "ERROR: invalid start position x coordinate";
        }
        var y = parseInt(startPosition[1]);
        if (isNaN(y)) {
            return "ERROR: invalid start position y coordinate";
        }
        var direction = startPosition[2];
        if (!/^[NSEW]$/.test(direction)) {
            return "ERROR: invalid startPosition direction";
        }
        return [x, y, direction];
    },

    validateMovements: function(movements) {
        movements = movements.replace(/\s/g, '');
        if (!/^[LRM]*$/.test(movements)) {
            return "ERROR: invalid movement string";
        }
        return movements.split("");
    },

    initializeHeadings: function() {
        // don't initialize if we already have it
        if (this.MOVEOPS) {
            return;
        }
        var HEADINGS = ["N", "E", "S", "W"];
        var MOVEOPS = {
            "N": {
                x: 0,
                y: 1
            },
            "E": {
                x: 1,
                y: 0
            },
            "S": {
                x: 0,
                y: -1
            },
            "W": {
                x: -1,
                y: 0
            }
        };
        var lastIndex = HEADINGS.length - 1;
        HEADINGS.forEach(function(heading, index) {
            var leftIndex = index ? index - 1 : lastIndex;
            var rightIndex = (index === lastIndex) ? 0 : index + 1;
            MOVEOPS[HEADINGS[index]].L = MOVEOPS[HEADINGS[leftIndex]];
            MOVEOPS[HEADINGS[index]].R = MOVEOPS[HEADINGS[rightIndex]];
            // same as the key - to make it easier to show results
            MOVEOPS[HEADINGS[index]].direction = HEADINGS[index];
        });
        this.MOVEOPS = MOVEOPS;
    },

    isInvalidPosition: function(position, plateauSize) {
        if (position.x < 0 ||
            position.y < 0 ||
            position.x > plateauSize.x ||
            position.y > plateauSize.y) {
            return true;
        } else {
            return false;
        }
    },
    moveRover: function(rover, plateauSize) {
        var heading, position, movements, i;
        var startPosition = this.validateStartPosition(rover.startPosition);
        if (typeof startPosition === "string") {
            return startPosition;
        }
        heading = this.MOVEOPS[startPosition[2]];
        position = {
            x: startPosition[0],
            y: startPosition[1]
        };
        if (this.isInvalidPosition(position, plateauSize)) {
            return "ERROR: rover starting off the plateau!";
        }
        movements = this.validateMovements(rover.movements);
        if (typeof movements === "string") {
            return movements;
        }
        for (i = 0; i < movements.length; i++) {
            if (movements[i] === "M") {
                position.x += heading.x;
                position.y += heading.y;
                if (this.isInvalidPosition(position, plateauSize)) {
                    return "ERROR: rover fell off the plateau (" + position.x + "," + position.y + ")";
                }
            } else {
                heading = heading[movements[i]];
            }
        }
        return position.x + " " + position.y + " " + heading.direction;
    }

};
