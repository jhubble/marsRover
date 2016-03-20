describe("Rover", function() {
	var input, output, expectedOutput;

    it("should properly process sample input", function() {
        input = "5 5\n" +
            "1 2 N\n" +
            "LMLMLMLMM\n" +
            "3 3 E\n" +
            "MMRMMRMRRM";
        output = MarsRover.processRover(input);
        expectedOutput = "1 3 N\n" +
            "5 1 E";
        expect(output).toBe(expectedOutput);
    });
    it("should keep rover in same position when no movement line provided", function() {
        input = "5 5\n" +
            "1 2 N\n" +
            "\n";
        output = MarsRover.processRover(input);
        expect(output).toBe("1 2 N");
    });

    describe("should reject input that would leave the plateau", function() {
        it("starts out of the range", function() {
            input = "5 5\n" +
                "6 6 N\n" +
                "\n"
            output = MarsRover.processRover(input);
            expect(output).toContain("ERROR");
        });
        it("moves out of range", function() {
            input = "5 5\n" +
                "4 4\n" +
                "MMM\n";
            output = MarsRover.processRover(input);
            expect(output).toContain("ERROR");
        });



    });

    describe("validate start position", function() {
	    it("should return error if first element is not a number", function() {
		    expect(MarsRover.validateStartPosition(["foo",2,3])).toContain("ERROR");
	    });
	    it("should return error if second element is not a number", function() {
		    expect(MarsRover.validateStartPosition([2,null,3])).toContain("ERROR");
	    });
	    it("should return error if third element is not a valid direction", function() {
		    expect(MarsRover.validateStartPosition([2,2,"Q"])).toContain("ERROR");
		    expect(MarsRover.validateStartPosition([2,2,"NE"])).toContain("ERROR");
		    expect(MarsRover.validateStartPosition([2,2,3])).toContain("ERROR");
		    expect(MarsRover.validateStartPosition([2,2,"E"])).toEqual([2,2,"E"]);
	    });
    });
    describe("rover movements", function() {
	    it("should loop back to same position going right or left", function() {
        input = "5 5\n" +
            "1 4 N\n" +
            "LMLMLMLM\n" +
            "4 1 E\n" +
            "RMRMRMRM";
		output = MarsRover.processRover(input);
		expectedOutput = "1 4 N\n" +
				"4 1 E";

		expect(output).toBe(expectedOutput);
	    });
    });
	    it("rotate in appropriate directions", function() {
        input = "5 5\n" +
            "2 3 E\n" +
            "L\n" +
            "2 3 E\n" +
            "LL\n" +
            "2 3 E\n" +
            "LLL\n" +
            "4 1 E\n" +
            "R\n" +
            "4 1 E\n" +
            "RR\n" +
            "4 1 E\n" +
            "RRR";
		output = MarsRover.processRover(input);
		expectedOutput = "2 3 N\n" +
				"2 3 W\n" +
				"2 3 S\n" +
				"4 1 S\n" +
				"4 1 W\n" +
				"4 1 N";
		expect(output).toBe(expectedOutput);
	    });
	    it("move in appropriate directions", function() {
        input = "5 5\n" +
            "2 3 E\n" +
            "M\n" +
            "2 3 S\n" +
            "M\n" +
            "2 3 W\n" +
            "M\n" +
            "2 3 N\n" +
	    "M";
		output = MarsRover.processRover(input);
		expectedOutput = "3 3 E\n" +
				"2 2 S\n" +
				"1 3 W\n" +
				"2 4 N" ;
		expect(output).toBe(expectedOutput);
	    });
});
