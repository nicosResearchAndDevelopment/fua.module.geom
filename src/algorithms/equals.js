const
    {
        TOLERANCE, $coords, assert
    }    = require('../module.geom.util.js'),
    algo = require('../algorithms');

/**
 * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomequals geom:equals}
 * Two geometries A and B are equal, if:
 * - for every point a in A, a is also in B
 * - and for every point b in B, b is also in A.
 */
const equals = exports;

/**
 * @param {Point} left
 * @param {Point} right
 * @returns {Boolean}
 */
equals.Point_Point = function (left, right) {
    return left === right
        || (left.x - TOLERANCE <= right.x
            && left.x + TOLERANCE >= right.x
            && left.y - TOLERANCE <= right.y
            && left.y + TOLERANCE >= right.y);
}; // equals.Point_Point

/**
 * @param {Line} left
 * @param {Line} right
 * @returns {Boolean}
 */
equals.Line_Line = function (left, right) {
    return left === right
        || (equals.Point_Point(left.source, right.source) && equals.Point_Point(left.target, right.target))
        || (equals.Point_Point(left.source, right.target) && equals.Point_Point(left.target, right.source));
}; // equals.Line_Line

/**
 * @param {LineString} left
 * @param {LineString} right
 * @returns {Boolean}
 */
equals.LineString_LineString = function (left, right) {
    // TODO implement algo.equals.LineString_LineString
    assert(false, `algo.equals.LineString_LineString : not implemented`);
    return left === right;
}; // equals.LineString_LineString

/**
 * @param {Polygon} left
 * @param {Polygon} right
 * @returns {Boolean}
 */
equals.Polygon_Polygon = function (left, right) {
    // TODO implement algo.equals.Polygon_Polygon
    assert(false, `algo.equals.Polygon_Polygon : not implemented`);
    return left === right;
}; // equals.Polygon_Polygon