module.exports = ({
    geom, conf: {
        tolerance
    },
    util: {
        $species, $iterator, $name_tag, $coords, $coord_species, $min_size, $max_size,
        assert, isArray, isFloat, isGeometry, isPoint, isLine, isBBox
    }
}) => {

    const algo = {};

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
     * @param {...[BBox, Geometry]} args 
     * @returns {Boolean}
     */
    algo.BBoxContainment = function (bbox, geom) {
        assert(isBBox(bbox) && isGeometry(geom),
            `algo.BBoxContainment : invalid @param {...[BBox, Geometry]} args`, TypeError);
        if (isPoint(geom)) {
            return geom.x >= bbox.min.x - tolerance
                && geom.x <= bbox.max.x + tolerance
                && geom.y >= bbox.min.y - tolerance
                && geom.y <= bbox.max.y + tolerance;
        } else {
            for (let coord of geom[$coords]) {
                if (!algo.BBoxContainment(bbox, coord))
                    return false;
            }
            return true;
        }
    }; // algo.BBoxContainment

    // /** 
    //  * @param {...[Line, Line]} args 
    //  * @returns {Boolean}
    //  */
    // algo.LineIntersection = function (ln1, ln2) {
    //     assert(isLine(ln1) && isLine(ln2), `algo.LineIntersection : invalid @param {...[Line, Line]} args`, TypeError);
    //     // TODO
    //     assert(false, `algo.LineIntersection : not implemented yet`);
    // }; // algo.LineIntersection

    // /** 
    //  * @param {...[Line, Point]} args 
    //  * @returns {Boolean}
    //  */
    // algo.LineContainsPoint = function (ln, pt) {
    //     assert(isLine(ln) && isPoint(pt), `algo.LineContainsPoint : invalid @param {...[Line, Point]} args`, TypeError);
    //     // TODO
    // }; // algo.LineContainsPoint

    return Object.freeze(algo);

}; // module.exports