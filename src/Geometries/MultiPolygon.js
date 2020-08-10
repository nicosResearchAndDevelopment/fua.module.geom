module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $max_size, $coords,
        assert, lockProp,
    }
}) => {

    class MultiPolygon extends geom.Geometry {

        static get [$name]() { return 'MultiPolygon'; }
        static get [$species]() { return MultiPolygon; }
        static get [$coord_species]() { return geom.Geometry; }
        static get [$min_size]() { return 0; }
        static get [$max_size]() { return 0; }

    } // MultiPolygon

    return MultiPolygon;

}; // module.exports