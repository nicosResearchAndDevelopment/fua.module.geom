const geom = require('../src/module.geom.js')();
const { Geometry, Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection } = geom;

// console.log("geom:", geom);

// const point = new Point(1, 3);
// console.log("point:", point);
// console.log("point.equals:", point.equals(point), point.equals(new Point(1 + Number.EPSILON, 3)));

// const multi_point = new MultiPoint(point, new Point(2, 4));
// multi_point.add(new Point(-1, 2));
// console.log("multi_point.json:", JSON.stringify(multi_point, null, 2));
// multi_point.lock();
// console.log("multi_point.bbox:", multi_point.bbox().coordinates());
// console.log("line:", point.lineTo(new Point(2, 4)));

// const line_string = new LineString(point, new Point(2, 2));
// console.log("multi_point.bbox.covers:", line_string.coordinates(), multi_point.bbox().covers(line_string));
// line_string.add(new Point(3, 0));
// console.log("multi_point.bbox.covers:", line_string.coordinates(), multi_point.bbox().covers(line_string));
// console.log("line.intersects:", (new Point(0, 0)).lineTo(new Point(1, 1)).intersects((new Point(0, 1)).lineTo(new Point(1, 0))));
// console.log("line.intersects false:", (new Point(0, 0)).lineTo(new Point(1, 1)).intersects((new Point(0, .1)).lineTo(new Point(1, 1.1))));

// console.log(
//     (new geom.Point(0, 0))
//         .lineTo(new geom.Point(3, 0))
//         .covers(new geom.Point(2, 0)),
//     (new geom.Point(0, 0))
//         .lineTo(new geom.Point(3, 3))
//         .covers(new geom.Point(2, 2))
// );
// debugger;

const polygon = Polygon.from([
    [[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]],
    [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]
]);

console.log([
    `polygon.covers:`,
    `> [.5, .5]: ` + polygon.covers(Point.from([.5, .5])) + ` -> interior`,
    `> [2, 2]: ` + polygon.covers(Point.from([2, 2])) + ` -> boundary`,
    `> [2.6, 1.8]: ` + polygon.covers(Point.from([2.6, 1.8])) + ` -> interior`,
    `> [1, 3]: ` + polygon.covers(Point.from([1, 3])) + ` -> boundary`,
    `> [1.5, 1.5]: ` + polygon.covers(Point.from([1.5, 1.5])) + ` -> exterior`,
    `> [-1, -1]: ` + polygon.covers(Point.from([-1, -1])) + ` -> exterior`,
    `> [4, 1]: ` + polygon.covers(Point.from([4, 1])) + ` -> exterior`,
    `> [0, 0]: ` + polygon.covers(Point.from([0, 0])) + ` -> boundary`,
    `> [3, 2]: ` + polygon.covers(Point.from([3, 2])) + ` -> boundary`
].join("\n"));

console.log([
    `polygon.contains:`,
    `> [.5, .5]: ` + polygon.contains(Point.from([.5, .5])) + ` -> interior`,
    `> [2, 2]: ` + polygon.contains(Point.from([2, 2])) + ` -> boundary`,
    `> [2.6, 1.8]: ` + polygon.contains(Point.from([2.6, 1.8])) + ` -> interior`,
    `> [1, 3]: ` + polygon.contains(Point.from([1, 3])) + ` -> boundary`,
    `> [1.5, 1.5]: ` + polygon.contains(Point.from([1.5, 1.5])) + ` -> exterior`,
    `> [-1, -1]: ` + polygon.contains(Point.from([-1, -1])) + ` -> exterior`,
    `> [4, 1]: ` + polygon.contains(Point.from([4, 1])) + ` -> exterior`,
    `> [0, 0]: ` + polygon.contains(Point.from([0, 0])) + ` -> boundary`,
    `> [3, 2]: ` + polygon.contains(Point.from([3, 2])) + ` -> boundary`
].join("\n"));

// console.log("polygon.covers:", polygon.covers(Point.from([.5, .5])));
// console.log("polygon.covers false:", polygon.covers(Point.from([1.5, 1.5])));

debugger; process.exit(0);