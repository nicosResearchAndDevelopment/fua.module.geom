const
    {
        TOLERANCE, $coords, assert
    }    = require('../module.geom.util.js'),
    algo = require('../algorithms');

/**
 * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomcontains geom:contains}
 * A geometry A contains a geometry B, if:
 * - for every point b in B, b is also in A
 * - and at least one point c in the interior of B is also in the interior of A.
 */
const contains = exports;

/**
 * @param {Line} left
 * @param {Point} right
 * @returns {Boolean}
 */
contains.Line_Point = function (left, right) {
    // TODO implement algo.contains.Line_Point
    assert(false, `algo.contains.Line_Point : not implemented`);
}; // contains.Line_Point

/**
 * @param {Polygon} left
 * @param {Point} right
 * @returns {Boolean}
 */
contains.Polygon_Point = function (left, right) {
    const intersection_pattern = algo.preprocess.Polygon_Point_intersection_pattern(left, right);
    return /^[L][LE]*$/.test(intersection_pattern);
}; // contains.Polygon_Point