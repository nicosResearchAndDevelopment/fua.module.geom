module.exports = ({
    algo, conf: {
        tolerance
    }, util: {
        $coords, assert
    }
}) => {

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomintersects geom:intersects}
     * Two geometries A and B intersect, if:
     * - their exists at least one point a in A, that is also in B.
     */
    const intersects = {};

    /** 
     * @param {Line} left 
     * @param {Line} right 
     * @returns {Boolean}
     */
    intersects.Line_Line = function (left, right) {
        const
            Lx = left.from.x, Ly = left.from.y,
            lx = left.to.x - Lx, ly = left.to.y - Ly,
            Rx = right.from.x, Ry = right.from.y,
            rx = right.to.x - Rx, ry = right.to.y - Ry;

        if (Math.abs(lx * ry - ly * rx) <= tolerance * tolerance) {
            // as the left and right line seem parallel, instead check
            // if they cover one of the others end points
            return algo.covers.Line_Point(left, right.from)
                || algo.covers.Line_Point(left, right.to)
                || algo.covers.Line_Point(right, left.from)
                || algo.covers.Line_Point(right, left.to);
        }

        let lt, rt;
        const
            dlx = Math.abs(lx), dly = Math.abs(ly),
            drx = Math.abs(rx), dry = Math.abs(ry);

        if (dlx <= tolerance && dly <= tolerance) {
            if (drx <= tolerance && dry <= tolerance) {
                // as the left and right line seem very short, instead check
                // if any of their endpoints equal
                return algo.equals.Point_Point(left.from, right.from)
                    || algo.equals.Point_Point(left.from, right.to)
                    || algo.equals.Point_Point(left.to, right.from)
                    || algo.equals.Point_Point(left.to, right.to);
            } else {
                // as the left line seems very short, instead check 
                // if one of its end points is covered by the right line
                return algo.covers.Line_Point(right, left.from)
                    || algo.covers.Line_Point(right, left.to);
            }
        } else if (drx > dry) {
            // use rx as devider
            const tmp = ry / rx;
            lt = (tmp * (Lx - Rx) - (Ly - Ry)) / (ly - tmp * lx);
            rt = (lt * lx + (Lx - Rx)) / rx;
        } else if (dry > tolerance) {
            // use ry as devider
            const tmp = rx / ry;
            lt = (tmp * (Ly - Ry) - (Lx - Rx)) / (lx - tmp * ly);
            rt = (lt * ly + (Ly - Ry)) / ry;
        } else {
            // as the right line seems very short, instead check 
            // if one of its end points is covered by the left line
            return algo.covers.Line_Point(left, right.from)
                || algo.covers.Line_Point(left, right.to);
        }

        const
            le = 2 * tolerance / Math.hypot(lx, ly),
            re = 2 * tolerance / Math.hypot(rx, ry);

        return (lt < .5)
            ? ((rt < .5)
                ? (lt >= 0 && rt >= 0)
                || (lt >= -le && rt >= -re
                    && algo.equals.Point_Point(left.from, right.from))
                : (lt >= 0 && rt <= 1)
                || (lt >= -le && rt <= 1 + re
                    && algo.equals.Point_Point(left.from, right.to)))
            : ((rt < .5)
                ? (lt <= 1 && rt >= 0)
                || (lt <= 1 + le && rt >= -re
                    && algo.equals.Point_Point(left.to, right.from))
                : (lt <= 1 && rt <= 1)
                || (lt <= 1 + le && rt <= 1 + re
                    && algo.equals.Point_Point(left.to, right.to)));

    }; // intersects.Line_Line

    /** 
     * @param {BBox} left 
     * @param {BBox} right 
     * @returns {Boolean}
     */
    intersects.BBox_BBox = function (left, right) {
        return left.min.x - tolerance <= right.max.x
            && left.max.x + tolerance >= right.min.x
            && left.min.y - tolerance <= right.max.y
            && left.max.y + tolerance >= right.min.y;
    }; // intersects.BBox_BBox

    return Object.freeze(intersects);

}; // module.exports