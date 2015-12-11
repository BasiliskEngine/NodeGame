var keystate = {};
var mx = 0;
var my = 0;
var mdown = false;

var drag_started = false;
var dragx = 0;
var dragy = 0;

document.addEventListener('mousemove', function(evt) {
	if (mdown) {
		if (drag_started) {
			dragx = mx;
			dragy = my;
		}
		
		drag_started = true;
	} else {
		drag_started = false;
		dragx = 0;
		dragy = 0;
	}

	mx = evt.x;
	my = evt.y;
});

document.addEventListener('mousedown', function(evt) {
	mdown = true;
});

document.addEventListener('mouseup', function(evt) {
	mdown = false;
});

document.addEventListener('keydown', function(evt) {
	keystate[evt.keyCode] = true;
});

document.addEventListener('keyup', function(evt) {
	delete keystate[evt.keyCode];
});