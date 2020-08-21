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

const polygon = Polygon.from([
    [[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]],
    [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]
]);
for (let check_point of [
    new Point(0, 0),
    new Point(-1, -1),
    new Point(5, 2),
    new Point(2, 5)
]) {
    console.log(
        `polygon.testPoint (check ${check_point.x} ${check_point.y}):`,
        polygon.testPoint(Point.from([.5, .5]), check_point),
        polygon.testPoint(Point.from([1.5, 1.5]), check_point),
        polygon.testPoint(Point.from([1, 2]), check_point),
        polygon.testPoint(Point.from([3, 3]), check_point),
        polygon.testPoint(Point.from([4, 3.5]), check_point),
        polygon.testPoint(Point.from([-1, -1]), check_point),
        polygon.testPoint(Point.from([0, 0]), check_point)
    );
}
// console.log("polygon.contains:", polygon.contains(Point.from([.5, .5])));
// console.log("polygon.contains false:", polygon.contains(Point.from([1.5, 1.5])));

debugger; process.exit(0);