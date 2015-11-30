define(["../lib/canvas","./particle", "../lib/vector", "./collision"], function(canvas, Particle, Vector, collision) {

	function World(width, height) {
		var self = this;
		this.width = width;
		this.height = height;

		this.ctx = canvas.ctx;
		this.particles = [
			new Particle(self, {position: new Vector(300, 20), color: 'blue'}),
			new Particle(self, {position: new Vector(320, 300), color: 'red'}),
			new Particle(self, {position: new Vector(500, 90), color: 'pink'}),
			new Particle(self, {position: new Vector(460, 110), color: 'black'}),
			new Particle(self, {position: new Vector(440, 150), color: 'black'}),
			new Particle(self, {position: new Vector(480, 210), color: 'green'}),
			new Particle(self, {position: new Vector(520, 400), color: 'red'}),
			new Particle(self, {position: new Vector(580, 250)}),

			new Particle(self, {position: new Vector(40, 15), color: 'blue'}),
			new Particle(self, {position: new Vector(60, 300), color: 'red'}),
			new Particle(self, {position: new Vector(100, 70), color: 'black'}),
			new Particle(self, {position: new Vector(120, this.height/2), color: 'black'}),
			new Particle(self, {position: new Vector(340, 20), color: 'green'}),
			new Particle(self, {position: new Vector(420, 420), color: 'red'}),
			new Particle(self, {position: new Vector(540 , 500)}),

			new Particle(self, {position: new Vector(2 * 40, 2 * 15), color: 'blue'}),
			new Particle(self, {position: new Vector(2 * 60, 2 * 300), color: 'red'}),
			new Particle(self, {position: new Vector(2 * 100, 2 * 70), color: 'black'}),
			new Particle(self, {position: new Vector(2 * 120, 2 * this.height/2), color: 'black'}),
			new Particle(self, {position: new Vector(2 * 340, 2 * 20), color: 'green'}),
			new Particle(self, {position: new Vector(2 * 420, 2 * 420), color: 'red'}),
			new Particle(self, {position: new Vector(2 * 540 ,2 *  500)}),

			new Particle(self, {position: new Vector(2 * 300, 2 * 20), color: 'blue'}),
			new Particle(self, {position: new Vector(2 * 320, 2 * 300), color: 'red'}),
			new Particle(self, {position: new Vector(2 * 500, 2 * 90), color: 'pink'}),
			new Particle(self, {position: new Vector(2 * 460, 2 * 110), color: 'black'}),
			new Particle(self, {position: new Vector(2 * 440, 2 * 150), color: 'black'}),
			new Particle(self, {position: new Vector(2 * 480, 2 * 210), color: 'green'}),
			new Particle(self, {position: new Vector(2 * 520, 2 * 400), color: 'red'}),
			new Particle(self, {position: new Vector(2 * 580, 2 * 250)})

		];
	}

	/**
	 * Move objects, check for collitions, remove
	 * objects that don't belong anymore, etc
	 */
	World.prototype.update = function() {

		// check for collisions and canvas limits
		// react to those if necessary
		for(var i=0; i < this.particles.length; i++) {
			
			var c = this.particles[i];
			console.log(this.width);
			if (c.position.x + c.radius > this.width || c.position.x - c.radius < 0) {
				c.setDirection(new Vector(c.direction.x * -1, c.direction.y));

				if (c.position.x + c.radius > this.width)
					c.setPosition(new Vector(this.width - c.radius, c.position.y));
				if (c.position.x - c.radius < 0)
					c.setPosition(new Vector(c.radius, c.position.y));
			} 

			if (c.position.y + c.radius > this.height || c.position.y - c.radius < 0) {
				c.setDirection(new Vector(c.direction.x, c.direction.y * -1));

				if (c.position.y + c.radius > this.height)
					c.setPosition(new Vector(c.position.x, this.height - c.radius));
				if (c.position.y - c.radius < 0)
					c.setPosition(new Vector(c.position.x, c.radius));
			}

			// check other particles
			for(var j= i + 1; j < this.particles.length; j++) {
				if(collision.collide(c, this.particles[j])){
					c.reactToCollision(this.particles[j]);
					this.particles[j].reactToCollision(c);
				}
			}

			c.act();
		}
	};

	/** 
	 * Renders the world and all the objects in it
	 */
	World.prototype.render = function() {
		this.ctx.clearRect(0,0, this.width, this.height);

		for(var i=0; i < this.particles.length; i++) {
			this.particles[i].render();
		}
	};

	World.prototype.isInside = function(point) {
		return point.x >= 0 && point.y >= 0 &&
			point.x < this.width && point.y < this.height;
	};

	return World;
});