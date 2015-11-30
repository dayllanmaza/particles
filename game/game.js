define(["./world"], function(World) {
	
	var Game = function (canvas) {
		this.canvas = canvas;
		this.width = canvas.width;
		this.height = canvas.height;
		this.FRAMES_PER_SEC = 60;
		this.running = false;
		
		this.world = null;
	}

	Game.prototype.start = function() {
		
		var self = this;

		this.world = new World(this.width, this.height);

		if(!this.running) {
			this.running = setInterval(function(){
				self.update();
			}, 1000/this.FRAMES_PER_SEC);
		}
	};

	Game.prototype.stop = function() {
		 if (this.running) {
			clearInterval(this.running);
			this.running = null;
		}
	}

	Game.prototype.update = function (delta) {
		// calcualte elapsed time
		var now = Date.now();

		// TODO: implement this
		this.world.tick = (now - this.lastUpdate);

		// render
		this.world.update();
		this.world.render();

		// save last frame time
		this.lastUpdate = now;
	};

	return Game;
});