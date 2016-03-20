# marsRover
marsRover

This code allows a rectangular Martian plateau to be explored.

# Input 
Input is a string with w series of lines:
Line 1: size of plateau `integer integer` Example: `4 4` identifies a plateau where top right coordinates are 4 and 4.
Next a pair of lines are needed for each rover.

Initial Position Line: `integer integer direction` (where direction is in `NSEW`) example `2 2 E` would be at coordinates 2,2 headed east.

Movement Line: `LRM*` example `LMMRMLM`. This would turn left, move two spaces, turn right, move one space and turn left and move one space. Each movement is one coordinate in the current facing direction.

# Output
Output is a series of lines for each rover.
If the rover movement was valid, it will return a position (identical in format to the initial position)

If an error ocurred, a line starting with "ERROR:" will be returned.

If a general ocurred preventing the processing of any rovers, then a single line will be returned.

If an error ocurred with an individual Rover, the error line would be returned instead of the final position.

Since error messages may represent a lost rover (due to bad instructions), it is highly recommended that all instructions be first tried in a a Rover simulation lab before communicating directly with the Mars rovers.

# Running

Clone the repository, then load Rover.html in a browser.  Paste the input lines in the input field and click the button to show the output below.

To use as API, use `rover.js` script.
Call `MarsRover.processRover(string)` where string contains the entire input text (with newlines dividing individual lines.) The output lines will be returned.

## Example

Input: 
```
5 5 
1 2 N 
LMLMLMLMM 
3 3 E 
MMRMMRMRRM 
```
Output:
```
1 3 N 
5 1 E
```
# Future work 
* More extensive tests
* Better error checking
* Prevalidation of paths before executing results on the rover
 
