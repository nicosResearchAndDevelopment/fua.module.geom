module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp,
    }
}) => {

    class GeometryCollection extends geom.Geometry {

        static get [$name]() { return 'GeometryCollection'; }
        static get [$species]() { return GeometryCollection; }
        static get [$coord_species]() { return geom.Geometry; }
        static get [$unique_coords]() { return true; }

        equals(that) {
            assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
            if (this === that) return true;
            return super.equals(that); // TODO
        } // GeometryCollection#equals

        contains(that) {
            assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
            return super.contains(that); // TODO
        } // GeometryCollection#contains

        intersects(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            return super.intersects(that); // TODO
        } // GeometryCollection#intersects

        overlaps(that) {
            assert(isGeometry(that), `${this[$name_tag]}#overlaps : invalid @param {Geometry} that`);
            return super.overlaps(that); // TODO
        } // GeometryCollection#overlaps

        touches(that) {
            assert(isGeometry(that), `${this[$name_tag]}#touches : invalid @param {Geometry} that`);
            return super.touches(that); // TODO
        } // GeometryCollection#touches

    } // GeometryCollection

    return GeometryCollection;

}; // module.exports