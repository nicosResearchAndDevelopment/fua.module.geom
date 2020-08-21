const geom = require('../src/module.geom.js')();
const { Point, LineString, Polygon } = geom;

describe("a Point should", () => {

    const point = Point.from([4, 2]);

    test("intersect another Point, if their coords are the same", () => {
        expect(point.intersects(Point.from([4, 2]))).toBeTruthy();
        expect(point.intersects(Point.from(point.coordinates()))).toBeTruthy();
        expect(point.intersects(Point.from([4, 2 - Number.EPSILON]))).toBeTruthy();
        expect(point.intersects(Point.from([6, 9]))).toBeFalsy();
        expect(point.intersects(Point.from([4, 2.0001]))).toBeFalsy();
        expect(point.intersects(Point.from([-4, 2]))).toBeFalsy();
    });

});

describe("a LineString should", () => {

    const line = LineString.from([[0, 0], [1, 1], [1, 0], [2, 0]]);

    test("intersect another LineString, if some of their lines cross", () => {
        expect(line.intersects(LineString.from([[0, 1], [.9, .1]]))).toBeTruthy();
        expect(line.intersects(LineString.from([[0, 1], [2, 1]]))).toBeTruthy();
        expect(line.intersects(LineString.from([[.1, 0], [.9, 0]]))).toBeFalsy();
    });

});