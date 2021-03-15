module.exports = ({
    geom, conf, util: {
        $species, $iterator, $name_tag, $coords, $coord_species, $min_size, $max_size,
        assert, isArray, isFloat, isGeometry, isPoint, isLine, isBBox
    }
}) => {

    const
        tolerance = conf.tolerance,
        algo = {};

    /** 
     * @param {...[Point, Point]} args 
     * @returns {Boolean}
     */
    algo.PointEquality = function (pt1, pt2) {
        assert(isPoint(pt1) && isPoint(pt2), `algo.PointEquality : invalid @param {...[Point, Point]} args`, TypeError);
        return pt2.x >= pt1.x - tolerance
            && pt2.x <= pt1.x + tolerance
            && pt2.y >= pt1.y - tolerance
            && pt2.y <= pt1.y + tolerance;
    }; // algo.PointEquality

    /** 
     * @param {...[BBox, Point]} args 
     * @returns {Boolean}
     */
    algo.BBoxContainment = function (bbox, pt) {
        assert(isBBox(bbox) && isPoint(pt),
            `algo.BBoxContainment : invalid @param {...[BBox, Point]} args`, TypeError);
        return pt.x >= bbox.min.x - tolerance
            && pt.x <= bbox.max.x + tolerance
            && pt.y >= bbox.min.y - tolerance
            && pt.y <= bbox.max.y + tolerance;
    }; // algo.BBoxContainment

    /** 
     * @param {...[Line, Point]} args 
     * @returns {Boolean}
     */
    algo.LineContainment = function (ln, pt) {
        assert(isLine(ln) && isPoint(pt), `algo.LineContainment : invalid @param {...[Line, Point]} args`, TypeError);
        let p, tmp0, Cx, Cy;
        const
            // starting point A (^= ln.from)
            Ax = ln.from.x, Ay = ln.from.y,
            // vector a from A to its line ending (^= ln)
            ax = ln.to.x - Ax, ay = ln.to.y - Ay,
            // point B (^= pt)
            Bx = pt.x, By = pt.y,
            // p = (B - A) / a => two values, because p is over-determined
            px = (Bx - Ax) / ax, py = (By - Ay) / ay,
            // tolerance on p for x and p
            tx = tolerance * (Math.SQRT2 / ax), ty = tolerance * (Math.SQRT2 / ay);

        // check if px and py are even close to one another
        if (px + tx < py - ty || px - tx > py + ty)
            return false;

        p = (px + py) / 2;
        tmp0 = tolerance * (Math.SQRT2 / ((ax + ay) / 2));
        // check if p is between 
        if (p < 0 - tmp0 || p > 1 + tmp0)
            return false;

        // nearest point to B on line a
        Cx = Ax + p * ax;
        Cy = Ay + p * ay;

        // now return position equality for B and C
        return Cx >= Bx - tolerance &&
            Cx <= Bx + tolerance &&
            Cy >= By - tolerance &&
            Cy <= By + tolerance;
    }; // algo.LineContainment

    /** 
     * @param {...[Line, Line]} args 
     * @returns {Boolean}
     */
    algo.LineIntersection = function (ln1, ln2) {
        assert(isLine(ln1) && isLine(ln2), `algo.LineIntersection : invalid @param {...[Line, Line]} args`, TypeError);
        let
            // temporary variables that gets reused
            tmp0, tmp1,
            // p relates to ln1 and q relates to ln2
            // these are calculated and indicate intersection
            p, q;

        const
            // starting point A (^= ln1.from)
            Ax = ln1.from.x, Ay = ln1.from.y,
            // vector a from A to its line ending (^= ln1)
            ax = ln1.to.x - Ax, ay = ln1.to.y - Ay,
            // starting point B (^= ln2.from)
            Bx = ln2.from.x, By = ln2.from.y,
            // vector b from B to its line ending (^= ln2)
            bx = ln2.to.x - Bx, by = ln2.to.y - By;

        // set p and q to check if parallel
        // this ensures not deviding by zero for the main term
        tmp0 = ax * by; tmp1 = ay * bx;
        if (tmp0 - tolerance <= tmp1 && tmp0 + tolerance >= tmp1) {
            // as a and b seem parallel, instead check if a overlaps b
            // TODO replace function calls
            return ln1.overlaps(ln2, tolerance);
        }

        // set p and q to pick coordinate with higher absolute value
        // this ensures not deviding by zero for the ratio of bx and by
        tmp0 = Math.abs(bx); tmp1 = Math.abs(by);
        if (tmp0 > tmp1) {
            // use bx as divider
            tmp0 = by / bx;
            p = (tmp0 * (Ax - Bx) - (Ay - By)) / (ay - tmp0 * ax);
            q = (p * ax + (Ax - Bx)) / bx;
        } else if (tmp1 > tolerance) {
            // use by as devider
            tmp0 = bx / by;
            p = (tmp0 * (Ay - By) - (Ax - Bx)) / (ax - tmp0 * ay);
            q = (p * ay + (Ay - By)) / by;
        } else {
            // as b seems very short, instead check if a contains the endpoints of b
            return algo.LineContainment(ln1, ln2.from) || algo.LineContainment(ln1, ln2.to);
        }

        // a intersects b, if p and q are between 0 and 1
        tmp0 = tolerance * (Math.SQRT2 / Math.hypot(ln1.to.x - ln1.from.x, ln1.to.y - ln1.from.y));
        tmp1 = tolerance * (Math.SQRT2 / Math.hypot(ln2.to.x - ln2.from.x, ln2.to.y - ln2.from.y));
        if (p < 0 - tmp0 || p > 1 + tmp0 || q < 0 - tmp1 || q > 1 + tmp1) {
            // sure not intersecting
            return false;
        } else if (p >= 0 && p <= 1) {
            if (q >= 0 && q <= 1) {
                // sure intersecting
                return true;
            } else {
                // not sure because of tolerance, maybe a touches b, so b contains an endpoint of a
                return algo.LineContainment(ln2, p < .5 ? ln1.from : ln1.to);
            }
        } else if (q >= 0 && q <= 1) {
            // not sure because of tolerance, maybe b touches a, so a contains an endpoint of b
            return algo.LineContainment(ln1, p < .5 ? ln2.from : ln2.to);
        } else {
            // not sure because of tolerance, maybe touching endpoints
            // TODO reconsider reliability of this method of intersection with tolerance and make sure it works consistent
            return algo.PointEquality(p < .5 ? ln1.from : ln1.to, q < .5 ? ln2.from : ln2.to);
        }
    }; // algo.LineIntersection

    return Object.freeze(algo);

}; // module.exports