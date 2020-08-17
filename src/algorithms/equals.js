module.exports = ({
    algo, util: {
        $species, $iterator, $name_tag, $coords, $coord_species, $min_size, $max_size,
        assert, isArray, isFloat, isGeometry, isPoint, isLine, isBBox
    }
}) => {

    const
        tolerance = conf.tolerance,
        equals = {};

    /** 
     * @param {Point} left 
     * @param {Point} right 
     * @returns {Boolean}
     */
    equals.Point_Point = function (left, right) {

        // TODO
        assert(false, `algo.equals.Point_Point : not implemented`);

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