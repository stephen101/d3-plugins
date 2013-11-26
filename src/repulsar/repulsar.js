this.repulsar = function() {

	var repulsion = .8,
	 	radius = 1,
		cx, 
		cy,
		repulsarRadius = 0,
		shouldRepulse,
		data;

	behavior.repulsion = function(_) {
		if (!arguments.length) return repulsion;
		repulsion = _;
		return behavior;
	}

	behavior.shouldRepulse = function(_) {
		shouldRepulse = _;
		return behavior;
	};

	behavior.nodeRadius = function(x) {
		if (!arguments.length) return radius;
		radius = typeof x === "function" ? x : +x;
		return behavior;
	};

	behavior.repulsarRadius = function(x) {
		if (!arguments.length) return repulsarRadius;
		repulsarRadius = typeof x === "function" ? x : +x;
		return behavior;
	};

	behavior.cx = function(_) {
	    if (!arguments.length) return cx;
	    cx = _;
	    return behavior;
	};

	behavior.cy = function(_) {
	    if (!arguments.length) return cy;
	    cy = _;
	    return behavior;
	};

	behavior.data = function(_) {
		if (!arguments.length) return data;
		data = _;
		return behavior;
	};

	function behavior(e) {
		var tmp = _(data).filter(function(node) { return shouldRepulse(node)});
		tmp.push({ x : cx, y: cy, radius: repulsarRadius });

		var q = d3.geom.quadtree(tmp),
			i = 0,
			n = tmp.length;
		

		while (++i < n) q.visit(collide(e, tmp[i]));
	}

	function getRadius(node) {
		if (typeof radius === "function")
			return radius(node)
		else
	 		return radius; 
	}

	function collide(e, node) {
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
			  r = repulsarRadius + getRadius(quad.point);
		  if (l < r) {
			l = (l - r) / l * e.alpha * repulsion;
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