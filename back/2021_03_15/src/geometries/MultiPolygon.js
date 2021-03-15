module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp,
    }
}) => {

    class MultiPolygon extends geom.Geometry {

        static get [$name]() { return 'MultiPolygon'; }
        static get [$species]() { return MultiPolygon; }
        static get [$coord_species]() { return geom.Polygon; }
        static get [$unique_coords]() { return true; }

    } // MultiPolygon

    return MultiPolygon;

}; // module.exports