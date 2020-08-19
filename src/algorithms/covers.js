module.exports = ({
    algo, conf: {
        tolerance
    }, util: {
        $coords, assert
    }
}) => {

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomcovers geom:covers}
     * A geometry A covers a geometry B, if:
     * - at least one point b in B is also in A
     * - and there exists no point in B, which is in the exterior of A.
     */
    const covers = {};

    /** 
     * @param {Line} left 
     * @param {Point} right 
     * @returns {Boolean}
     */
    covers.Line_Point = function (left, right) {
        // TODO implement algo.covers.Line_Point
        assert(false, `algo.covers.Line_Point : not implemented`);
    }; // covers.Line_Point

    /** 
     * @param {BBox} left 
     * @param {Point} right 
     * @returns {Boolean}
     */
    covers.BBox_Point = function (left, right) {
        return left.min.x - tolerance <= right.x
            && left.max.x + tolerance >= right.x
            && left.min.y - tolerance <= right.y
            && left.max.y + tolerance >= right.y;
    }; // covers.BBox_Point

    /** 
     * @param {BBox} left 
     * @param {BBox} right 
     * @returns {Boolean}
     */
    covers.BBox_BBox = function (left, right) {
        return left.min.x - tolerance <= right.min.x
            && left.max.x + tolerance >= right.max.x
            && left.min.y - tolerance <= right.min.y
            && left.max.y + tolerance >= right.max.y;
    }; // covers.BBox_BBox

    return Object.freeze(covers);

}; // module.exports