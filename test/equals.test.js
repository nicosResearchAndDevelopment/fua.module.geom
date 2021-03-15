const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    {
        geom: {Point, LineString},
        pnt0, pnt1, pnt2, pnt3, pnt4, pnt5, pnt6, pnt7, pnt8,
        lns0, lns1, lns2,
        poly0
    }                = require('./test.setup.js');

describe("a Point should", () => {

    test("equal another Point, if their coords are (nearly) the same", () => {
        expect(pnt1.equals(pnt1)).toBeTruthy();
        expect(pnt1.equals(new Point(pnt1.x, pnt1.y))).toBeTruthy();
        expect(pnt1.equals(new Point(pnt1.x + Number.EPSILON, pnt1.y - Number.EPSILON))).toBeTruthy();
    });

    test("not equal any Point that has not the same coordinates", () => {
        expect(pnt1.equals(pnt2)).toBeFalsy();
        expect(pnt0.equals(pnt3)).toBeFalsy();
        expect(pnt1.equals(new Point(pnt1.x, pnt1.y + .0001))).toBeFalsy();
        expect(pnt2.equals(new Point(-pnt2.x, pnt2.y))).toBeFalsy();
    });

    test("not equal anything else other than Points/MultiPoints", () => {
        expect(pnt0.equals(lns0)).toBeFalsy();
        expect(pnt3.equals(poly0)).toBeFalsy();
        expect(pnt5.equals(lns1)).toBeFalsy();
    });

});