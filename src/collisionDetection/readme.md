#Minimum Circle

Calculates the centrepoint and radius of the smallest circle that encircles all the points provided as input.  Drag the points around in the above vizualisation to see the circle update.

[__Example__](http://bl.ocks.org/stephen101/7672174)

## Instantiation

First create the layout and pass in the data points you are working with
```javascript
	var circle = minimumCircle()
	      			.data(points)
```

Then call the layout to calculate circle centre and radius, this allows you to change the underlying data and re-evaluate the function multiple times
```javascript
    var circleData = circle()
```


##Rendering

To render the circle from the calculated data
```javascript
	d3.select("svg")
		.append("circle")
		    .attr("r", circleData.r)
            .attr("cx", circleData.x)
            .attr("cy", circleData.y);
```
