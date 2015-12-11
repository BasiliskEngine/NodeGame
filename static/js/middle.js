var socket = io();
var already_received = 0;
var first_received = false;
var username = "";

var Middle = function(socket) {
	this.socket = socket;

	this.socket.on('initial_data', this.initial.bind(this));
	this.socket.on('map_data', this.getMapData.bind(this));
	this.socket.on('tile_state_changed', this.updateTile.bind(this));
}

Middle.prototype.initial = function(md) {	
	this.map_data = md;
	already_received = 1;
	first_received = true;
	this.username = $('#username').html();
}

Middle.prototype.getMapData = function() {
	return this.map_data;
}

Middle.prototype.updateTile = function(tile) {
	if (tile.united == true) {
		// console.log('tile ' + tile.id + ' is owned by ' + tile.owner + ' and is now united')
		map.updateTileData(tile.id, tile.owner, tile.united);
	}
}

Middle.prototype.getUsername = function() {
	return this.username;
}

Middle.prototype.send = function(name, data) {
	this.socket.emit(name, data);
}