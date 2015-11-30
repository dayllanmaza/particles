define(["./canvas", "./vector"],function(canvas, Vector){
	
	var Circle = function(options){
		var options = options || {};

		
		this.radius = options.radius || 10; 
		this.color = options.color || "rgba(0,102,204,.8)";


		this.setPosition(options.position); // Vector(x,y)
	};

	Circle.prototype.setPosition = function(position) {
		this.position = position;
	};

	Circle.prototype.render = function() {

		var ctx = canvas.ctx;
		
		//draw a circle
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();

		// add shadow
		// Now draw a red circle with a different style shadow
        ctx.shadowColor = 'rgba(255,255,255,.5)';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur    = 1;

        ctx.restore();
	};

	return Circle;
});