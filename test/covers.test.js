const geom = require('../src/module.geom.js')();
const { Point, LineString, Polygon } = geom;

describe("a Polygon should", () => {

    const poly = Polygon.from([
        [[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]],
        [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]
    ]);

    test("cover a point inside", () => {
        expect(poly.covers(Point.from([.5, .5]))).toBeTruthy();
        expect(poly.covers(Point.from([2, 2]))).toBeTruthy();
        expect(poly.covers(Point.from([1, 3]))).toBeTruthy();
        expect(poly.covers(Point.from([1.5, 1.5]))).toBeFalsy();
        expect(poly.covers(Point.from([-1, -1]))).toBeFalsy();
        expect(poly.covers(Point.from([4, 1]))).toBeFalsy();
        expect(poly.covers(Point.from([0, 0]))).toBeTruthy();
    });

});