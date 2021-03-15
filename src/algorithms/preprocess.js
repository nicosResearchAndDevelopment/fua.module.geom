const
    {
        TOLERANCE, $coords, assert
    }    = require('../module.geom.util.js'),
    algo = require('../algorithms');

/**
 * Preprocessing algorithms are generally private and will be used
 * as basis for other algorithms to reduce their code size.
 */
const preprocess = exports;

/**
 * @param {LineString} left
 * @param {Line} right
 * @returns {String}
 */
preprocess.LineString_Line_intersection_pattern = function (left, right) {

    const
        ax = right.to.x - right.from.x,
        ay = right.to.y - right.from.y;

    let pattern = '';
    for (let segment of left.toLineArray()) {

        if (segment.covers(right.from)) {
            pattern += 'B'; // the start of the line lies on the segment (boundary)
        } else if (segment.intersects(right)) {
            const
                bx        = segment.to.x - segment.from.x,
                by        = segment.to.y - segment.from.y,
                indicator = Math.sign(ax * by - ay * bx);

            if (indicator > 0) pattern += 'L'; // the line crosses the segment from the left (-> outside)
            else if (indicator < 0) pattern += 'R'; // the line crosses the segment from the right (-> inside)
            else pattern += 'P'; // the line intersects the segment, but is parallel
        } else {
            pattern += 'E'; // the line does not cross the segment (empty)
        }

    } // for every line_segment
    return pattern;

}; // preprocess.LineString_Line_intersection_pattern

preprocess.Polygon_Point_intersection_pattern = function (left, right) {

    const
        check_line = right.lineTo(left.bbox(true).max);

    let pattern = '';
    for (let linear_ring of left[$coords]) {

        const
            indicator = algo.preprocess.LineString_Line_intersection_pattern(linear_ring, check_line)
                // remove empty results
                .replace(/E/g, '')
                // boundary check
                .replace(/^.*B.*$/, 'B')
                // reduce chained Ls or Rs to single character
                .replace(/L[LP]*L/g, 'L')
                .replace(/R[RP]*R/g, 'R')
                .replace(/^[LP]*L(.*?)L[LP]*$/, (m, p) => "L" + p)
                .replace(/^[RP]*R(.*?)R[RP]*$/, (m, p) => "R" + p)
                // remove all RL and LR pairs
                .replace(/LP*R|RP*L/g, "");

        if (indicator.length === 0) {
            pattern += 'E';
        } else {
            assert(indicator.length === 1, `algo.preprocess.LineString_Line_intersection_pattern : unexpected indicator '${indicator}' of length > 1`);
            pattern += indicator;
        }

    } // for every linear_ring
    return pattern;

}; // preprocess.Polygon_Point_intersection_pattern