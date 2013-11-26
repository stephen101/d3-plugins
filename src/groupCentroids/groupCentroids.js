this.groupCentroids = function() {
	var x, y, group, data;

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

	 layout.group = function(_) {
	    if (!arguments.length) return group;
	    group = _;
	    return layout;
	 };

	 layout.data = function(_) {
	    if (!arguments.length) return data;
	    data = _;
	    return layout;
	 };

	 function layout() {
	 	var nest = d3.nest()
		    .key(function(d) { 
		    	return group(d); 
		    })
		    .rollup(function(leaves) { 
		    	var vertices = leaves.map(function (d) { return [x(d), y(d)] });
		    	var hull = d3.geom.hull(vertices);
		    	return {
		    			"vertices" : vertices,
		    			"centroid" : d3.geom.polygon(hull).centroid()
			    }
			})
		    .entries(data);

		return _(nest).filter(function(d) { 
			return !isNaN(d.values.centroid[0]) }
		);
	 	
	 }

	 return layout;
}