const geom = require('../src/module.geom.js')();
const { Point } = geom;

describe("a Point should", () => {

    const point = new Point(4, 2);

    test("equal another Point, if their coords are the same", () => {
        expect(point.equals(new Point(4, 2))).toBeTruthy();
        expect(point.equals(new Point(...point.coordinates()))).toBeTruthy();
        expect(point.equals(new Point(4, 2 - Number.EPSILON))).toBeTruthy();
        expect(point.equals(new Point(6, 9))).toBeFalsy();
        expect(point.equals(new Point(4, 2.0001))).toBeFalsy();
        expect(point.equals(new Point(-4, 2))).toBeFalsy();
    });

});