module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $coords,
        assert, lockProp,
    }
}) => {

    class LineString extends geom.Geometry {

        static get [$name]() { return 'LineString'; }
        static get [$species]() { return LineString; }
        static get [$coord_species]() { return geom.Point; }
        static get [$min_size]() { return 2; }

    } // LineString

    return LineString;

}; // module.exports