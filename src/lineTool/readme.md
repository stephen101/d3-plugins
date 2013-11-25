#Line Tool

The purpose of this plugin is to make working with line segments a little easier.

## Instantiation

To create  new line tool
    var lt = lineTool()
                .x(source_pos.x)
                .y(source_pos.y)
                .x1(x)
                .y1(y)

## Calculate angle

To calculate the angle from horizontal between the source and destination points:
    lt.angle()

## Calculate distance

To calculate the distance between the source and destination points:
    lt.angle()