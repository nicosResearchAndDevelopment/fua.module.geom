module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $max_size, $coords,
        assert, lockProp,
    }
}) => {

    class MultiPoint extends geom.Geometry {

        static get [$name]() { return 'MultiPoint'; }
        static get [$species]() { return MultiPoint; }
        static get [$coord_species]() { return geom.Point; }

    } // MultiPoint

    return MultiPoint;

}; // module.exports