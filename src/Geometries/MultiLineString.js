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

        equals(that) {
            assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
            if (this === that) return true;
            return super.equals(that); // TODO
        } // MultiLineString#equals

        contains(that) {
            assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
            return super.contains(that); // TODO
        } // MultiLineString#contains

        intersects(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            return super.intersects(that); // TODO
        } // MultiLineString#intersects

        overlaps(that) {
            assert(isGeometry(that), `${this[$name_tag]}#overlaps : invalid @param {Geometry} that`);
            return super.overlaps(that); // TODO
        } // MultiLineString#overlaps

        touches(that) {
            assert(isGeometry(that), `${this[$name_tag]}#touches : invalid @param {Geometry} that`);
            return super.touches(that); // TODO
        } // MultiLineString#touches

    } // MultiLineString

    return MultiLineString;

}; // module.exports