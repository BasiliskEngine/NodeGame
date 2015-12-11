var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var got_map_data = false;

var map = new Map();
var middle = new Middle(socket);
var uniform = new Uniform();

function main() {
	init();

	var loop = function(dt) {
		update();
		render();
		setTimeout(function() {
			window.requestAnimationFrame(loop);
		}, 1000 / 60);
	};

	window.requestAnimationFrame(loop);
}

function init() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;


	middle.getMapData();
}

function update() {
	var map_data = check_fetch();// Get map data from server and store on client, send to map

	if (keystate[27] && keystate[88]) {
		window.location = '/logout';
	}

	// Switch this from keys to click and drag to scroll
	if (keystate[37]) map.translate(5, 0);
	if (keystate[38]) map.translate(0, 5);
	if (keystate[39]) map.translate(-5, 0);
	if (keystate[40]) map.translate(0, -5);

	map.update();
}

function render() {
	ctx.fillStyle = "#000"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	map.render(ctx);

	ctx.fillStyle = "#fff";
	ctx.font = "20px Georgia";
	ctx.fillText("(Escape + x to logout)", 32, 32);
}

function check_fetch() {
	var map_data;
	if (!got_map_data) {
		if (already_received == 1) {
			map_data = middle.getMapData();
			// got data here
			username = middle.getUsername();
			got_map_data = true;
			for (var i = 0; i < map_data.tiles.length; i++) {
				push_to_map(map_data.tiles[i]);
			}
			// map data pushed to map class here
		}
	} else {
		return;
	}

	return map_data;
}

function push_to_map(tile) {
	var x = uniform.getX(tile.id, 100);
	var y = uniform.getY(tile.id, 100);
	var t = new Tile(tile.id, tile.owner, tile.type, x * 48, y * 48, tile.united);
	map.addTile(t);
}

main();