'use strict';

var Map = Class.extend({
	init: function() {
		this.tiles = [];
	},

	translate: function(x, y) {
		for (var i = 0; i < this.tiles.length; i++) {
			this.tiles[i].translate(x, y);
		}
	},

	setTile: function(id, tile) {
		this.tiles[id] = tile
	},

	updateTileData: function(id, new_owner, new_is_united) {
		this.tiles[id].setOwner(new_owner);
		this.tiles[id].setUnited(new_is_united);
	},

	addTile: function(tile) {
		if (this.tiles.length < 10000) // 10000 is the max
			this.tiles.push(tile);
	},

	setTileType: function(index, type) {
		this.tiles[index].setType(type);
	},

	update: function() {
		for (var i = 0; i < this.tiles.length; i++) {
			this.tiles[i].update();
		}
	},

	render: function(ctx) {
		if (this.tiles[0] == undefined) return;
		for (var i = 0; i < this.tiles.length; i++) {
			if (this.tiles[i].getX() < -48 || this.tiles[i].getX() >= canvas.width || this.tiles[i].getY() < -48 || this.tiles[i].getY() >= canvas.height) {
				continue;
			}
			this.tiles[i].render(ctx);
		}
	}
});