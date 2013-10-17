define(function(){
	var Point =function(x,y) {
		this.x = x;
		this.y = y;
	};

	Point.prototype.add = function(point) {
		this.x += point.x;
		this.y += point.y;

		return this;
	}

	return Point;
});