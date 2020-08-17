module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp,
    }
}) => {

    class GeometryCollection extends geom.Geometry {

        static get [$name]() { return 'GeometryCollection'; }
        static get [$species]() { return GeometryCollection; }
        static get [$coord_species]() { return geom.Geometry; }
        static get [$unique_coords]() { return true; }

    } // GeometryCollection

    return GeometryCollection;

}; // module.exports