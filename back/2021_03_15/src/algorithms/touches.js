module.exports = ({
    algo, conf: {
        tolerance
    }, util: {
        $coords, assert
    }
}) => {

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomtouches-geommeets geom:touches}
     * Two geometries A and B are touching, if:
     * - for every point a in the interior of A, a is not in the interior of B
     * - and at least one point c on the boundary of A is on the boundary of B.
     */
    const touches = {};

    /** 
     * @param {Line} left 
     * @param {Line} right 
     * @returns {Boolean}
     */
    touches.Line_Line = function (left, right) {
        // TODO implement algo.touches.Line_Line
        assert(false, `algo.touches.Line_Line : not implemented`);
    }; // touches.Line_Line

    return Object.freeze(touches);

}; // module.exports