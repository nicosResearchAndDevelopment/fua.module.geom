const
    {
        TOLERANCE, $coords, assert
    }    = require('../module.geom.util.js'),
    algo = require('../algorithms');

/**
 * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomcovers geom:covers}
 * A geometry A covers a geometry B, if:
 * - at least one point b in B is also in A
 * - and there exists no point in B, which is in the exterior of A.
 */
const covers = exports;

/**
 * @param {Line} left
 * @param {Point} right
 * @returns {Boolean}
 */
covers.Line_Point = function (left, right) {

    const
        // L[x,y]: the start of the left line 
        Lx                                    = left.from.x, Ly                  = left.from.y,
        // l[x,y]: the direction vector of the left line 
        lx                                    = left.to.x - Lx, ly = left.to.y - Ly,
        // R[x,y]: the right point
        Rx                                    = right.x, Ry                      = right.y,
        // t[x,y]: the factor of l[x,y] to reach R[x,y]
        tx                                    = (Rx - Lx) / lx, ty               = (Ry - Ly) / ly,
        // e[x,y]: the epsilon TOLERANCE for t[x,y]
        ex = 2 * TOLERANCE / Math.abs(lx), ey = 2 * TOLERANCE / Math.abs(ly);

    // for a point on a line, tx and ty should be (nearly) equal
    if (tx + ex < ty - ey || tx - ex > ty + ey)
        return false;

    const
        // lt: the mean of the factor of l to reach R
        // lt = isFloat(tx) ? isFloat(ty) ? (tx + ty) / 2 : tx : ty,
        lt = isNaN(tx) ? ty : isNaN(ty) ? tx : (tx + ty) / 2,
        // le: the epsilon TOLERANCE for lt
        le = 2 * TOLERANCE / ((Math.abs(lx) + Math.abs(ly)) / 2);

    // for a point on a line, lt should be (nearly) between 0 and 1
    if (lt < -le || lt > 1 + le) return false;
    // 0 meaning: R should be equal to L
    if (lt <= 0) return algo.equals.Point_Point(left.from, right);
    // 1 meaning: R should be equal to L+l
    if (lt >= 1) return algo.equals.Point_Point(left.to, right);

    const
        // P[x,y]: nearest point to R[x,y] on the line
        Px = Lx + lt * lx, Py = Ly + lt * ly;

    // now return position equality for R and P
    return Rx - TOLERANCE <= Px
        && Rx + TOLERANCE >= Px
        && Ry - TOLERANCE <= Py
        && Ry + TOLERANCE >= Py;

}; // covers.Line_Point

/**
 * @param {BBox} left
 * @param {Point} right
 * @returns {Boolean}
 */
covers.BBox_Point = function (left, right) {
    return left.min.x - TOLERANCE <= right.x
        && left.max.x + TOLERANCE >= right.x
        && left.min.y - TOLERANCE <= right.y
        && left.max.y + TOLERANCE >= right.y;
}; // covers.BBox_Point

/**
 * @param {BBox} left
 * @param {BBox} right
 * @returns {Boolean}
 */
covers.BBox_BBox = function (left, right) {
    return left.min.x - TOLERANCE <= right.min.x
        && left.max.x + TOLERANCE >= right.max.x
        && left.min.y - TOLERANCE <= right.min.y
        && left.max.y + TOLERANCE >= right.max.y;
}; // covers.BBox_BBox

/**
 * @param {Polygon} left
 * @param {Point} right
 * @returns {Boolean}
 */
covers.Polygon_Point = function (left, right) {
    const intersection_pattern = algo.preprocess.Polygon_Point_intersection_pattern(left, right);
    return /^[LB][LBE]*$/.test(intersection_pattern);
}; // covers.Polygon_Point