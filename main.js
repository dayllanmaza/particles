// TODO: find a place for all this functions
function forEachIn(object, action) {
	for (var property in object) {
		if (object.hasOwnProperty(property))
			action(property, object[property]);
	}
}

function map(func, array) {
  var result = [];
  forEach(array, function (element) {
    result.push(func(element));
  });
  return result;
}

function forEach(func, array) {
	for(var i=0; i< array.length; i++)
		func(array[i]);
};
// ---- END generic functions

(function() {

	// require main
	require(
		['game/game'],
		function(Game) {

			var canvas = document.getElementById('canvas');
			var game = new Game(canvas);
			game.start();

			document.getElementById('stop').addEventListener('click', function(){
				game.stop();
			});

			document.getElementById('start').addEventListener('click', function(){
				game.start();
			});
		}
	);
})();