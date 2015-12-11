// Uniform algorithm

'use strict';

var Uniform = Class.extend({
	toID: function(x, y, width) {

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