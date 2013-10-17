define(["./canvas", "./point"], function (canvas, Point){
	
	var Rectangle = function(options) {
		var opt = options || {}

		this.color = opt.color || "rgb(0,0,0)";
		this.w = opt.w || 30;
		this.h = opt.h || 30;

		this.setPosition(opt.position);
	};

	Rectangle.prototype.setPosition = function(position) {
		this.position = position || new Point(canvas.width/2, canvas.height/2);
		this.x = this.position.x - this.w/2;
		this.y = this.position.y - this.h/2;

		this.left = this.position.x - this.w / 2;
		this.right = this.left + this.w;
		this.top = this.position.y - this.h / 2;
		this.bottom = this.top + this.h;


		// this.prevPosition = this.position;
	};

	Rectangle.prototype.render = function() {
		// get canvas context
		var ctx = canvas.ctx;

		ctx.fillStyle = this.color ;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};

	return Rectangle;
});