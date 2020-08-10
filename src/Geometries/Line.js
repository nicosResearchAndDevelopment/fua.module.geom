module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $unique_coords, $min_size, $max_size, $coords,
        assert, lockProp,
    }
}) => {

    class Line extends geom.Geometry {

        static get [$name]() { return 'Line'; }
        static get [$species]() { return Line; }
        static get [$coord_species]() { return geom.Point; }
        static get [$unique_coords]() { return true; }
        static get [$min_size]() { return 2; }
        static get [$max_size]() { return 2; }

        /** @type {Point} */
        get from() { return this[$coords][0]; }

        /** @type {Point} */
        get to() { return this[$coords][1]; }

    } // Line

    return Line;

}; // module.exports