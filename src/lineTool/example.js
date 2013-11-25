function render() {
    var width = 1000,
        height = 400,
        control_width = 0
        center_x = control_width + (width - control_width) / 2,
        center_y =  height  / 2,
        control_point_radius = 6,
        source_pos = { 
            x: center_x, 
            y: center_y
        },
        dest_pos = {
            x: center_x + 100, 
            y: center_y - 100
        };

    function update(x, y) {
        dest
            .attr("cx", x)
            .attr("cy", y)

        line
            .attr("x2", x)
            .attr("y2", y)

        var lt = lineTool()
                    .x(source_pos.x)
                    .y(source_pos.y)
                    .x1(x)
                    .y1(y)

        angle.text(Math.round(lt.angle()) + "°");
        dist
            .attr("x", x)
            .attr("y", y - 20)
            .text(Math.round(lt.dist()) + "px");
    }

    function drawAxes() {
        svg_root
            .append("line")
                .attr("class", "axis")
                .attr("x1", source_pos.x)
                .attr("y1", source_pos.y-100)
                .attr("x2", source_pos.x)
                .attr("y2", source_pos.y+100);

        svg_root
            .append("line")
                .attr("class", "axis")
                .attr("x1", source_pos.x - 300)
                .attr("y1", source_pos.y)
                .attr("x2", source_pos.x + 300)
                .attr("y2", source_pos.y);
    }

    var svg_root = d3.select("#svg_root");
    drawAxes();

    var drag = d3.behavior.drag()
        .on("drag", function(d,i) {
            var x = d.x += d3.event.dx
            var y = d.y += d3.event.dy
            update(x,y);
        });

    var line = svg_root
        .append("line")
            .attr("class", "line_segment")
            .attr("x1", source_pos.x)
            .attr("y1", source_pos.y)
            .attr("x2", dest_pos.x)
            .attr("y2", dest_pos.y);

    svg_root
        .append("circle")
            .datum(source_pos)
            .attr("class", "source")
            .attr("r", control_point_radius)
            .attr("cx", source_pos.x)
            .attr("cy", source_pos.y);

    var angle = svg_root
        .append("text")
            .attr("class", "angle")
            .attr("x", source_pos.x)
            .attr("y", source_pos.y + 30)

    var dist = svg_root
        .append("text")
            .attr("class", "dist")

    var dest = svg_root
        .append("circle")
            .datum(dest_pos)
            .attr("class", "destination")
            .attr("r", control_point_radius)
            .call(drag);

    update(dest_pos.x, dest_pos.y)

}