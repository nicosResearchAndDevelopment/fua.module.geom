module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $max_size, $coords,
        assert, lockProp,
    }
}) => {

    class Line extends geom.Geometry {

        static get [$name]() { return 'Line'; }
        static get [$species]() { return Line; }
        static get [$coord_species]() { return geom.Geometry; }
        static get [$min_size]() { return 0; }
        static get [$max_size]() { return 0; }

    } // Line

    return Line;

}; // module.exports