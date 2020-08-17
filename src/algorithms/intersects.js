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
        // TODO implement algo.intersects.Line_Line
        assert(false, `algo.intersects.Line_Line : not implemented`);
    }; // intersects.Line_Line

    return Object.freeze(intersects);

}; // module.exports