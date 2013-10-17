define(function(){
	var Vector = function(x,y){
		this.x = x;
		this.y = y;
	};

	Vector.prototype.add = function(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	};

	Vector.prototype.sub = function(v) {
		return new Vector(this.x - v.x, this.y - v.y)
	};

	Vector.prototype.length = function() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	};

	Vector.prototype.normalize = function() {
		return new Vector(this.x/this.length(), this.y/this.length());
	}

	Vector.prototype.mult = function(val) {
		return new Vector(this.x*val, this.y*val);
	};

	Vector.prototype.clone = function() {
		return new Vector(this.x, this.y);
	}

	return Vector;
});