const
    {
        TOLERANCE, $coords, assert
    }    = require('../module.geom.util.js'),
    algo = require('../algorithms');

/**
 * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomcrosses geom:crosses}
 * A geometry A crosses a geometry B, if:
 * - A intersects B
 * - and the dimension of the intersection is less than the maximum dimension of A and B.
 */
const crosses = exports;

/**
 * @param {Line} left
 * @param {Line} right
 * @returns {Boolean}
 */
crosses.Line_Line = function (left, right) {
    // TODO implement algo.crosses.Line_Line
    assert(false, `algo.crosses.Line_Line : not implemented`);
}; // crosses.Line_Line