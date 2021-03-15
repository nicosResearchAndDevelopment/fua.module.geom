const
    {
        TOLERANCE, $coords, assert
    }    = require('../module.geom.util.js'),
    algo = require('../algorithms');

/**
 * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomoverlaps geom:overlaps}
 * The geometries A and B are overlapping, if:
 * - A intersects B
 * - and the dimension of the intersection is the same as the dimension of A and B.
 */
const overlaps = exports;

/**
 * @param {Line} left
 * @param {Line} right
 * @returns {Boolean}
 */
overlaps.Line_Line = function (left, right) {
    // TODO covers or contains???
    return (
        algo.covers.Line_Point(left, right.from)
        && (algo.covers.Line_Point(left, right.to)
            || algo.covers.Line_Point(right, left.from)
            || algo.covers.Line_Point(right, left.to))
    ) || (
        algo.covers.Line_Point(left, right.to)
        && (algo.covers.Line_Point(right, left.from)
            || algo.covers.Line_Point(right, left.to))
    ) || (
        algo.covers.Line_Point(right, left.from)
        && algo.covers.Line_Point(right, left.to)
    );
}; // overlaps.Line_Line