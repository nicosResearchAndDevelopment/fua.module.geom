module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp,
    }
}) => {

    class MultiPoint extends geom.Geometry {

        static get [$name]() { return 'MultiPoint'; }
        static get [$species]() { return MultiPoint; }
        static get [$coord_species]() { return geom.Point; }
        static get [$unique_coords]() { return false; }

    } // MultiPoint

    return MultiPoint;

}; // module.exports