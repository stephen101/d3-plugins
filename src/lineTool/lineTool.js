this.lineTool = function() {

	var x,y,x1,y1;

	layout.x = function(_) {
	    if (!arguments.length) return x;
	    x = _;
	    return layout;
	};

	layout.y = function(_) {
	    if (!arguments.length) return y;
	    y = _;
	    return layout;
	};

	layout.x1 = function(_) {
	    if (!arguments.length) return x1;
	    x1 = _;
	    return layout;
	};

	layout.y1 = function(_) {
	    if (!arguments.length) return y1;
	    y1 = _;
	    return layout;
	};

	layout.angle = function() {
		return 180 - Math.atan2(y - y1, x - x1) * 180 / Math.PI;
	}

	layout.dist = function() {
		var dx = x1 - x;
		var dy = y1 - y;
		return Math.sqrt(dx * dx + dy * dy)
	}


	function layout() {

	}

	return layout;
}