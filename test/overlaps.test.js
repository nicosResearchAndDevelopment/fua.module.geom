const
    {describe, test} = require('mocha'),
    expect           = require('expect'),
    {
        geom: {Point, LineString},
        lns0, lns1, lns2, lns3,
        poly0
    }                = require('./test.setup.js');

describe("a LineString should", () => {

    test("overlap another LineString, if some of their lines share a part of their way", () => {
        expect(lns2.overlaps(lns3)).toBeTruthy();
    });

    test("not overlap another LineString, if their intersection is not 1-dimensional", () => {
        expect(lns2.overlaps(lns0)).toBeFalsy();
        expect(lns0.overlaps(lns1)).toBeFalsy();
    });

});