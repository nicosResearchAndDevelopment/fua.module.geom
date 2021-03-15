const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    {
        geom: {Point, LineString},
        pnt0, pnt1, pnt2, pnt3, pnt4, pnt5, pnt6, pnt7, pnt8,
        lns0, lns1, lns2,
        poly0
    }                = require('./test.setup.js');

// describe("a Point should", () => {

//     const point = Point.from([4, 2]);

//     test("intersect another Point, if their coords are the same", () => {
//         expect(point.intersects(Point.from([4, 2]))).toBeTruthy();
//         expect(point.intersects(Point.from(point.coordinates()))).toBeTruthy();
//         expect(point.intersects(Point.from([4, 2 - Number.EPSILON]))).toBeTruthy();
//         expect(point.intersects(Point.from([6, 9]))).toBeFalsy();
//         expect(point.intersects(Point.from([4, 2.0001]))).toBeFalsy();
//         expect(point.intersects(Point.from([-4, 2]))).toBeFalsy();
//     });

// });

describe("a LineString should", () => {

    test("intersect another LineString, if some of their lines cross", () => {
        expect(lns0.intersects(lns1)).toBeTruthy();
        expect(lns0.intersects(lns2)).toBeTruthy();
    });

    test("not intersect any LineString that does not cross any line", () => {
        expect(lns1.intersects(lns2)).toBeFalsy();
    });

});