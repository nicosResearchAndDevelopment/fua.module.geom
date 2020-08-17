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
        static get [$unique_coords]() { return true; }

        // equals(that) {
        //     assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
        //     if (this === that) return true;
        //     return super.equals(that); // TODO
        // } // MultiPoint#equals

    } // MultiPoint

    return MultiPoint;

}; // module.exports