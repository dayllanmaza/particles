define(['../lib/circle', '../lib/aura', './collision', '../lib/vector', '../lib/dictionary'],function(Circle, Aura, collision, Vector, Dictionary){
	var Particle = function(world, options) {
		var options = options || {}
		
		Circle.call(this, options);

		//TODO: implement singleton for the world
		this.world = world;
		this.mass = this.radius;
		// this.energy = 100;

		this.speed = options.speed || 3;
		
		// todo: move this somewhere else
		this.directions = new Dictionary({
			n: new Vector(0, 1),
			s: new Vector(0, -1),
			e: new Vector(1, 0),
			w: new Vector(-1, 0),
			ne: new Vector(1, 1),
			se: new Vector(1, -1),
			nw: new Vector(-1, 1),
			sw: new Vector(-1, -1)
		});

		this.setDirection(options.direction || this.directions.random());
		this.aura = new Aura(this);
	};

	// inheritance
	Particle.prototype = Object.create(Circle.prototype);

	Particle.prototype.act = function() {
		this.move();
	};

	/**
	 * Change position of object based on direction
	 * and speed
	 */
	Particle.prototype.move = function() {
		var pos = this.position.add(new Vector(this.direction.normalize().x * this.speed, this.direction.normalize().y * this.speed));
		this.setPosition(pos);
	};

	/**
	 * React to collision depending on the type of object
	 */
	Particle.prototype.reactToCollision = function(other) {
		
		//TODO: fix this
		//http://en.wikipedia.org/wiki/Elastic_collision
		//http://www.gamasutra.com/view/feature/131424/pool_hall_lessons_fast_accurate_.php?page=3
		var n = this.position.sub(other.prevPosition).normalize();

		var a1 = this.direction.dot(n);
		var a2 = other.prevDirection.dot(n);

		var optimizedP = (2 * (a1 - a2)) / (this.mass + other.mass);
		var newDir = this.direction.sub(n.mult(optimizedP * other.mass));
		
		// this.setPosition(this.prevPosition);
		this.setDirection(newDir);
		// this.move();
		
	};

	/**
	 * Needed to keep track of the previous direction
	 */
	Particle.prototype.setDirection = function(vector){
		this.prevDirection =  this.direction || vector;
		this.direction = vector;
	};

	/**
	 * Render
	 */
	Particle.prototype.render = function(){
		this.aura.render();
		this.constructor.prototype.render.call(this);
	};

	Particle.prototype.setPosition = function(pos){
		this.prevPosition = this.position || pos;
		this.constructor.prototype.setPosition.call(this, pos);
	};

	return Particle;
});