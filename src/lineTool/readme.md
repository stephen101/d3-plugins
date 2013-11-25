#Line Tool

The purpose of this plugin is to make working with line segments a little easier.

Demo: http://bl.ocks.org/stephen101/7640188/3ffe0c5dbb040f785b91687640a893bae07e36c3

## Instantiation

To create  new line tool
```javascript
var lt = lineTool()
            .x(source_pos.x)
            .y(source_pos.y)
            .x1(x)
            .y1(y)
```
## Calculate angle

To calculate the angle from horizontal between the source and destination points:
```javascript
lt.angle()
```

## Calculate distance

To calculate the distance between the source and destination points:
```javascript
lt.dist()
```