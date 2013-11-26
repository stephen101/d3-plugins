this.collisionDetection = function() {

	var repulsion = .5;
	var radius = 1;
	var data;

	behavior.repulsion = function(_) {
		if (!arguments.length) return repulsion;
		repulsion = _;
		return behavior;
	};

	behavior.data = function(_) {
		if (!arguments.length) return data;
		data = _;
		return behavior;
	};

	behavior.radius = function(x) {
		if (!arguments.length) return radius;
		radius = typeof x === "function" ? x : +x;
		return behavior;
	  };

	function behavior() {
		var q = d3.geom.quadtree(data),
			i = 0,
			n = data.length;

		while (++i < n) q.visit(collide(data[i]));
	}

	function getRadius(node) {
		if (typeof radius === "function")
			return radius(node)
		else
	 		return radius; 
	}

	function collide(node) {
	  var r = getRadius(node),
	  	  nx1 = node.x - r,
		  nx2 = node.x + r,
		  ny1 = node.y - r,
		  ny2 = node.y + r;
	  return function(quad, x1, y1, x2, y2) {
		if (quad.point && (quad.point !== node)) {
		  var x = node.x - quad.point.x,
			  y = node.y - quad.point.y,
			  l = Math.sqrt(x * x + y * y),
			  r = getRadius(node) + getRadius(quad.point);
		  if (l < r) {
			l = (l - r) / l * repulsion;
			node.x -= x *= l;
			node.y -= y *= l;
			quad.point.x += x;
			quad.point.y += y;
		  }
		}
		return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
	  };
	}

	return behavior;
}