define(function(){

	var canvas = document.getElementById('canvas');
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext('2d');

	return {
		width: width,
		height: height,
		ctx: ctx 
	}
});