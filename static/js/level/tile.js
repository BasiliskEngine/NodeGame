'use strict';

var Tile = Class.extend({
	init: function(id, owner, type, x, y, united) {
		this.id = id;
		this.owner = owner;
		this.type = type;
		this.x = x;
		this.y = y;
		this.united = united;

		this.img = new Image();
	},

	translate: function(x, y) {
		this.x += x;
		this.y += y;
	},

	getImage: function() {
		return this.img
	},

	getID: function() {
		return this.id
	},

	getOwner: function() {
		return this.owner
	},

	getType: function() {
		return this.type;
	},

	getX: function() {
		return this.x
	},

	getY: function() {
		return this.y
	},

	getUnited: function() {
		return this.united
	},

	setOwner: function(owner) {
		this.owner = owner
	},

	setType: function(type) {
		this.type = type
	},

	unit: function() {
		this.united = true
	},

	deunit: function() {
		this.united = false
	},

	setUnited: function(united) {
		this.united = united
	},

	update: function() {
		if (this.intersects_with(mx, my) && mdown) {
		 	middle.send('tile_united', {id: this.id, owner: username, united_already: this.united});
		}

		if (this.intersects_with(mx, my)) {
			hovered_owner = this.owner
		}
	},

	render: function(ctx) {
		if (this.type == 0) this.img = grass;
		if (this.type == 1) this.img = water;
		if (this.type == 2) this.img = trees;
		if (this.type == 3) this.img = mountain;

		ctx.drawImage(this.img, this.x, this.y);

		if (this.united) {
			ctx.drawImage(unit, this.x, this.y);
		}
	},

	intersects_with: function(xx, yy) {
		var x_int = xx >= this.x && xx <= this.x + 48;
		var y_int = yy >= this.y && yy <= this.y + 48;
		return (x_int && y_int);
	}
});