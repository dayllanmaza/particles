define(function(){

	var Dictionary = function(startValues){
		this.values = startValues || {};
	};

	Dictionary.prototype.store = function(name, value){
		this.values[name] = value;
	};

	Dictionary.prototype.lookup = function(name) {
		return this.values[name];
	};

	// TODO: Check this
	Dictionary.prototype.each = function(action) {
		for(var property in this.values) {
			action(property, this.values[property]);
		}
	};

	Dictionary.prototype.random = function() {
		var names = [];
		this.each(function(name, value){
			names.push(name);
		});

		return this.lookup(names[Math.floor(Math.random() * names.length)]);
	}

	return Dictionary;
});