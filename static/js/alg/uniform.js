// Uniform algorithm

'use strict';

var Uniform = Class.extend({
	toID: function(x, y, width) {
		return x + (y * width);
	},

	getIDFromPreciseCoordinates: function(x, y, width) {
		var nx = x / 48;
		var ny = y / 48;
		return this.toID(nx, ny, width);
	},

	getX: function(id, width) {
		if (id < width) {
			return id;
		} else {
			return id % width;
		}
	},

	getY: function(id, width) {
		if (id < width) {
			return 0;
		} else {
			return Math.floor(id / width);
		}
	}
});