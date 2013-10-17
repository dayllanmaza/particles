define(["./canvas", "./vector"], function(canvas, Vector) {

	Aura = function(circle, options) {
		var options = options || {};

		this.startAngle = Math.PI * 1.5;
		this.percent = options.percent || 100;
		this.circle = circle;
		this.radius = circle.radius + 4;
		this.size = circle.radius;
		this.color = circle.color; //TODO: Get this from the circle and 
	};

	Aura.prototype.render = function() {

		var ctx = canvas.ctx;
		ctx.save();
		// use value of the pointer to circle
		this.position = this.circle.position;
		// this.percent = this.circle.energy;

		ctx.shadowColor = this.color;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur    = 50;

		// draw aura
		ctx.beginPath();
		ctx.globalAlpha = 0.1;
		ctx.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.calculateEndAngle(), false);
		ctx.lineWidth= this.size;
		ctx.strokeStyle = this.color
		ctx.stroke();

        ctx.restore();
	};

	Aura.prototype.calculateEndAngle = function() {
		return this.startAngle + (this.percent * Math.PI* 2 / 100);
	};

	return Aura;
});