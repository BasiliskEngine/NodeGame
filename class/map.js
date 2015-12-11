
var Map = function(data) {
	this.data = data

	this.setTile.bind(this);
	this.setData.bind(this);
	this.getData.bind(this);
}

Map.prototype.setTile = function(index, tile){
	this.data[index] = tile
}

Map.prototype.setData = function(data) {
	this.data = data
}

Map.prototype.getData = function() {
	return this.data
}

module.exports = {
	Map: Map
};