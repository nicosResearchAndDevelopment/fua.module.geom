module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp,
    }
}) => {

    class MultiPolygon extends geom.Geometry {

        static get [$name]() { return 'MultiPolygon'; }
        static get [$species]() { return MultiPolygon; }
        static get [$coord_species]() { return geom.Polygon; }
        static get [$unique_coords]() { return true; }

        // equals(that) {
        //     assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
        //     if (this === that) return true;
        //     return super.equals(that); // TODO
        // } // MultiPolygon#equals

    } // MultiPolygon

    return MultiPolygon;

}; // module.exports