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

    test("contain a Point in the interior", () => {
        expect(poly0.contains(pnt0)).toBeTruthy();
        expect(poly0.contains(pnt1)).toBeTruthy();
        expect(poly0.contains(pnt2)).toBeTruthy();
    });

    test("not contain a Point on the boundary", () => {
        expect(poly0.contains(pnt3)).toBeFalsy();
        expect(poly0.contains(pnt4)).toBeFalsy();
        expect(poly0.contains(pnt5)).toBeFalsy();
    });

    test("not contain a Point in the exterior", () => {
        expect(poly0.contains(pnt6)).toBeFalsy();
        expect(poly0.contains(pnt7)).toBeFalsy();
        expect(poly0.contains(pnt8)).toBeFalsy();
    });

});