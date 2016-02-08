var keystate = {};
var mx = 0;
var my = 0;
var mdown = false;

document.addEventListener('mousemove', function(evt) {
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