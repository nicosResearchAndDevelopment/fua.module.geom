module.exports = ({
    algo, conf: {
        tolerance
    }, util: {
        $coords, assert
    }
}) => {

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomoverlaps geom:overlaps}
     * The geometries A and B are overlapping, if:
     * - A intersects B
     * - and the dimension of the intersection is the same as the dimension of A and B.
     */
    const overlaps = {};

    /** 
     * @param {Line} left 
     * @param {Line} right 
     * @returns {Boolean}
     */
    overlaps.Line_Line = function (left, right) {
        // TODO implement algo.overlaps.Line_Line
        assert(false, `algo.overlaps.Line_Line : not implemented`);
    }; // overlaps.Line_Line

    return Object.freeze(overlaps);

}; // module.exports