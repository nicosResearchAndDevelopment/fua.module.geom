module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $max_size, $coords,
        assert, lockProp,
    }
}) => {

    class LinearRing extends geom.Geometry {

        static get [$name]() { return 'LinearRing'; }
        static get [$species]() { return LinearRing; }
        static get [$coord_species]() { return geom.Geometry; }
        static get [$min_size]() { return 0; }
        static get [$max_size]() { return 0; }

    } // LinearRing

    return LinearRing;

}; // module.exports