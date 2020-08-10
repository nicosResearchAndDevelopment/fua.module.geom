module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp,
    }
}) => {

    class MultiLineString extends geom.Geometry {

        static get [$name]() { return 'MultiLineString'; }
        static get [$species]() { return MultiLineString; }
        static get [$coord_species]() { return geom.LineString; }
        static get [$unique_coords]() { return true; }

    } // MultiLineString

    return MultiLineString;

}; // module.exports