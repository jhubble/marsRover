describe("Rover", function() {

  it("should properly process sample input", function() {
	var input = "5 5\n"+ 
		  "1 2 N\n"+ 
		"LMLMLMLMM\n"+
		"3 3 E\n"+
		"MMRMMRMRRM\n"; 
  	output = processRovers(input);
	expectedOutput = "1 3 N\n"+
	  	"5 1 E\n";
	expect(output).toBe(expectedOutput);
  });

  it("should keep rover in same position when no movement line provided", function() {
	    input = "5 5\n"+
	    		"1 2 N\n"+
	    		"\n";
    	    output = processRovers(input);
    	    expect(output).toBe("1 2 N\n");
  });

  describe("should reject input that would leave the plateau", function() {
	  it("should reject start points beyond the range", function() {
		  input = "5 5\n"+
		  	"6 6 N\n"+
		  	"\n"
		  output = processRovers(input);
	  	  expect(output).toBe("\n");
	  });
	  it("should reject movements that would go beyond plateau", function() {
		  input = "5 5\n"+
		  	"4 4\n"+
		  	"MMM\n";
	  	  output = processRover(input);
		  expect(output).toBe("\n");
	  });
	  it("should reject subseque



    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
