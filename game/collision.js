define(['../lib/vector'],function(Vector){

	/*var rectangleCollision = function(rect1, rect2) {

		return Math.min(rect1.bottom, rect2.bottom) >= Math.max(rect1.top, rect2.top) &&
			Math.min(rect1.right, rect2.right) >= Math.max(rect1.left, rect2.left);

	};*/

	return {
		collide: function (a, b) {
			// distance between the two centers
			var distance = a.position.sub(b.position).length();

			return (distance < a.radius + b.radius);
		}
	};
});