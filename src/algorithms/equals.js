module.exports = ({
    algo, conf: {
        tolerance
    }, util: {
        $species, $iterator, $name_tag, $coords, $coord_species, $min_size, $max_size,
        assert, isArray, isFloat, isGeometry, isPoint, isLine, isBBox
    }
}) => {

    const equals = {};

    /** 
     * @param {Point} left 
     * @param {Point} right 
     * @returns {Boolean}
     */
    equals.Point_Point = function (left, right) {
        return left.x - tolerance <= right.x
            && left.x + tolerance >= right.x
            && left.y - tolerance <= right.y
            && left.y + tolerance >= right.y;
    }; // equals.Point_Point

    /** 
     * @param {LineString} left 
     * @param {LineString} right 
     * @returns {Boolean}
     */
    equals.LineString_LineString = function (left, right) {

        // TODO
        assert(false, `algo.equals.LineString_LineString : not implemented`);

    }; // equals.LineString_LineString

    /** 
     * @param {Polygon} left 
     * @param {Polygon} right 
     * @returns {Boolean}
     */
    equals.Polygon_Polygon = function (left, right) {

        // TODO
        assert(false, `algo.equals.Polygon_Polygon : not implemented`);

    }; // equals.Polygon_Polygon

    return Object.freeze(equals);

}; // module.exports