const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    {
        geom: {Point, LineString},
        pnt0, pnt1, pnt2, pnt3, pnt4, pnt5, pnt6, pnt7, pnt8,
        lns0, lns1, lns2,
        poly0
    }                = require('./test.setup.js');

describe("a Polygon should", () => {

    test("cover a Point in the interior", () => {
        expect(poly0.covers(pnt0)).toBeTruthy();
        expect(poly0.covers(pnt1)).toBeTruthy();
        expect(poly0.covers(pnt2)).toBeTruthy();
    });

    test("cover a Point on the boundary", () => {
        expect(poly0.covers(pnt3)).toBeTruthy();
        expect(poly0.covers(pnt4)).toBeTruthy();
        expect(poly0.covers(pnt5)).toBeTruthy();
    });

    test("not cover a Point in the exterior", () => {
        expect(poly0.covers(pnt6)).toBeFalsy();
        expect(poly0.covers(pnt7)).toBeFalsy();
        expect(poly0.covers(pnt8)).toBeFalsy();
    });

});

describe("a LineString should", () => {

    test("cover a Point on any line segment", () => {
        expect(lns0.covers(pnt0)).toBeTruthy();
        expect(lns0.covers(pnt8)).toBeTruthy();
        expect(lns0.covers(pnt6)).toBeTruthy();
        expect(lns2.covers(pnt3)).toBeTruthy();
    });

    test("not cover any Points outside the lines", () => {
        expect(lns0.covers(pnt5)).toBeFalsy();
        expect(lns1.covers(pnt2)).toBeFalsy();
        expect(lns2.covers(pnt6)).toBeFalsy();
    });

});