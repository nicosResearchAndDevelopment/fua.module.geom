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

        equals(that) {
            assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
            if (this === that) return true;
            return super.equals(that); // TODO
        } // MultiPolygon#equals

        contains(that) {
            assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
            return super.contains(that); // TODO
        } // MultiPolygon#contains

        intersects(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            return super.intersects(that); // TODO
        } // MultiPolygon#intersects

        overlaps(that) {
            assert(isGeometry(that), `${this[$name_tag]}#overlaps : invalid @param {Geometry} that`);
            return super.overlaps(that); // TODO
        } // MultiPolygon#overlaps

        touches(that) {
            assert(isGeometry(that), `${this[$name_tag]}#touches : invalid @param {Geometry} that`);
            return super.touches(that); // TODO
        } // MultiPolygon#touches

    } // MultiPolygon

    return MultiPolygon;

}; // module.exports