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
            // L[x,y]: the start of the left line 
            Lx = left.from.x, Ly = left.from.y,
            // l[x,y]: the direction vector of the left line 
            lx = left.to.x - Lx, ly = left.to.y - Ly,
            // R[x,y]: the start of the right line 
            Rx = right.from.x, Ry = right.from.y,
            // r[x,y]: the direction vector of the right line 
            rx = right.to.x - Rx, ry = right.to.y - Ry,
            // dl[x,y]: absolute coordinates of l[x,y]
            dlx = Math.abs(lx), dly = Math.abs(ly),
            // dr[x,y]: absolute coordinates of r[x,y]
            drx = Math.abs(rx), dry = Math.abs(ry);

        // l[x,y] and r[x,y] are parallel, if lx*ry (nearly) equals ly*rx
        if (Math.abs(lx * ry - ly * rx) <= tolerance * tolerance) {
            // if parallel, check if one of the endpoints lies in the other line
            return algo.covers.Line_Point(left, right.from)
                || algo.covers.Line_Point(left, right.to)
                || algo.covers.Line_Point(right, left.from)
                || algo.covers.Line_Point(right, left.to);
        }

        // l (and r) is too short, if dl[x,y] (and dr[x,y] respectivly) is all in tolerance range
        if (dlx <= tolerance && dly <= tolerance) {
            if (drx <= tolerance && dry <= tolerance) {
                return algo.equals.Point_Point(left.from, right.from)
                    || algo.equals.Point_Point(left.from, right.to)
                    || algo.equals.Point_Point(left.to, right.from)
                    || algo.equals.Point_Point(left.to, right.to);
            } else {
                return algo.covers.Line_Point(right, left.from)
                    || algo.covers.Line_Point(right, left.to);
            }
        } else if (drx <= tolerance && dry <= tolerance) {
            return algo.covers.Line_Point(left, right.from)
                || algo.covers.Line_Point(left, right.to);
        }

        let
            // lt: the factor of l to reach the intersection with r
            lt,
            // rt: the factor of r to reach the intersection with l
            rt;


        if (drx > dry) {
            // use rx as devider
            const tmp = ry / rx;
            lt = (tmp * (Lx - Rx) - (Ly - Ry)) / (ly - tmp * lx);
            rt = (lt * lx + (Lx - Rx)) / rx;
        } else {
            // use ry as devider
            const tmp = rx / ry;
            lt = (tmp * (Ly - Ry) - (Lx - Rx)) / (lx - tmp * ly);
            rt = (lt * ly + (Ly - Ry)) / ry;
        }

        const
            // le: the epsilon tolerance for lt
            le = 2 * tolerance / Math.hypot(lx, ly),
            // re: the epsilon tolerance for rt
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