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

        equals(that) {
            assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
            if (this === that) return true;
            return super.equals(that); // TODO
        } // MultiPoint#equals

        contains(that) {
            assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
            return super.contains(that); // TODO
        } // MultiPoint#contains

        intersects(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            return super.intersects(that); // TODO
        } // MultiPoint#intersects

        overlaps(that) {
            assert(isGeometry(that), `${this[$name_tag]}#overlaps : invalid @param {Geometry} that`);
            return super.overlaps(that); // TODO
        } // MultiPoint#overlaps

        touches(that) {
            assert(isGeometry(that), `${this[$name_tag]}#touches : invalid @param {Geometry} that`);
            return super.touches(that); // TODO
        } // MultiPoint#touches

    } // MultiPoint

    return MultiPoint;

}; // module.exports