module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp,
    }
}) => {

    class MultiLineString extends geom.Geometry {

        static get [$name]() { return 'MultiLineString'; }
        static get [$species]() { return MultiLineString; }
        static get [$coord_species]() { return geom.LineString; }
        static get [$unique_coords]() { return true; }

        // equals(that) {
        //     assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
        //     if (this === that) return true;
        //     return super.equals(that); // TODO
        // } // MultiLineString#equals

    } // MultiLineString

    return MultiLineString;

}; // module.exports