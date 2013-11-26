this.forceUi = function() {
	var width = 1200,
		height = 800,
		data,
		circle_radius = 300,
		layers = [],
		annealIterations = 50;
	var position_cache = {}


	chart.width = function(w) {
	    if (!arguments.length) return width;
	    width = w;
	    return chart;
	};

	chart.height = function(h) {
	    if (!arguments.length) return height;
	    height = h;
	    return chart;
	};

	chart.circleRadius = function(r) {
	    if (!arguments.length) return circle_radius;
	    circle_radius = r;
	    return chart;
	};

	chart.layers = function(l) {
	    if (!arguments.length) return layers;
	    layers = l;
	    return chart;
	 };

	chart.data = function(d, anneal) {
		if (!arguments.length) return data;
		restorePositions(d);
		data = d;

		force.stop();
	
		force
			.nodes(data.nodes)
			.links(filterLinks(data));

		_(layers).each(function (l) {
			if (l.drag)
				l.layer.force(force);
			if (l.filter)
				l.layer.data(filterLinks(data));
			else
				l.layer.data(data.nodes);
		});

		if (anneal === true || anneal === undefined)
			chart.start();
		else
			force.start();
		return chart;
	};

	chart.start =  function() {
		force.start();
		var safety = 0;

		//Anneal the layout without rendering untill it's more stable
		while(force.alpha() > 0.05) {
			force.tick();
			force.alpha(force.alpha() + (force.alpha() * .02));
			if(safety++ > annealIterations) {
			  break;// Avoids infinite looping in case this solution was a bad idea
			}
		}
		force.stop();
		_(layers).chain()
			.filter(function(l) { return l.transition == true })
			.each(function(l) { l.layer.update(true); });

		window.setTimeout(function() { force.alpha(.1); } , 200);
		return chart;
	}

	function getLinkDistance(l) {
		switch(l.type)
		{
			case "input":
			case "free_input":
			  return 30;
			case "label":
			  return 15;
			case "output":
			  return 30;
			default:
			  return 50;
		}
	}

	d3.selectAll(".panels_container");

	var force = d3.layout.force()
			.charge(function (d,i) { return - 100 - d.nodes * 180 })
			.linkDistance(getLinkDistance)
			.gravity(.05)
			.size([width, height]);

	force.drag()
		.on("drag", function (d) { 
			d.draged = true;
			d.fixed = true;
		})

	var layer_groups = d3.select(".layer")
		.on("mousedown", function(d) { 
		      d3.event.stopPropagation();
	        });

	force.on("tick", function(e) {
			_(layers).each(function (l) {
				l.layer(e);
			});
		});

	function filterLinks(graph) {
		return _(graph.links).filter(function(d) { 
			if (!graph.nodes[d.source] && !graph.nodes[d.target]) return true;
			return !graph.nodes[d.source].detached && !graph.nodes[d.target].detached} 
		)
	 }

	function getPositionCache() {
		var position_cache = Session.get("position_cache")
		
		if (!position_cache) {
			position_cache = {};
			Session.set("position_cache", position_cache);
		}

		return position_cache;
	} 

	function restorePositions(d) {
		if (!data) return;
		
		var position_cache = getPositionCache();

		_(data.nodes).each(function (datum) {
			position_cache[datum.uri] = {
				x : datum.x,
				y : datum.y,
				px : datum.px,
				py : datum.py
			}
		});
		_(d.nodes).each(function (datum, index) {
			cachedPos = position_cache[datum.uri];
			if (cachedPos) {
				datum.x = cachedPos.x;
				datum.y = cachedPos.y;
				datum.px = cachedPos.px;
				datum.py = cachedPos.py;
			}
			else
			{
				datum.x = index;
				datum.y = 0;
				datum.px = index;
				datum.py = 0;
			}
		});
	} 

	function chart() {
		
	}

	return chart;
}