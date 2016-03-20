// Events for the rover form

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('send').addEventListener('click', function(e) {
        e.preventDefault();
        var result = MarsRover.processRover(document.getElementById('instructions').value);
        document.getElementById('results').innerHTML = result;
    })
});
