module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $coords,
        assert, lockProp,
    }
}) => {

    class LinearRing extends geom.LineString {

        static get [$name]() { return 'LinearRing'; }
        static get [$species]() { return LinearRing; }
        static get [$coord_species]() { return geom.Point; }
        static get [$min_size]() { return 4; }

        // NOTE those need a wrapper to ensure condition of: 
        //      this[$coords][0] === this[$coords][this.size - 1]
        // TODO constructor() {}
        // TODO add() {}
        // TODO insert() {}
        // TODO remove() {}

    } // LinearRing

    return LinearRing;

}; // module.exports