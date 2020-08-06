module.exports = ({
    geom, conf: {
        tolerance
    }, util: {
        $species, $iterator, $name_tag, $children, $child_species, $min_childs, $max_childs,
        assert, isArray, isFloat, isGeometry, isPosition, isPoint
    }
}) => {

    const algo = {};

    algo.PointEquality = function (pt1, pt2) {
        assert(isPoint(pt1) && isPoint(pt2), "invalid arguments", TypeError);
        return pt1.x < pt2.x + tolerance
            && pt2.x < pt1.x + tolerance
            && pt1.y < pt2.y + tolerance
            && pt2.y < pt1.y + tolerance;
    }; // algo.PointEquality

    // algo.LineIntersection = function (ln1, ln2) {
    //     // TODO
    // }; // algo.LineIntersection

    return Object.freeze(algo);

}; // module.exports