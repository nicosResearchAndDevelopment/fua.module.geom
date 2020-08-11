module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $coords,
        assert, lockProp, isGeometry, isPoint, isLine
    }
}) => {

    class Polygon extends geom.Geometry {

        static get [$name]() { return 'Polygon'; }
        static get [$species]() { return Polygon; }
        static get [$coord_species]() { return geom.LinearRing; }
        static get [$min_size]() { return 1; }

        equals(that) {
            assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
            if (this === that) return true;
            return super.equals(that); // TODO
        } // Polygon#equals

        contains(that) {
            assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);

            if (isPoint(that)) {
                const
                    bbox = this.bbox(true),
                    check_line = that.lineTo(bbox.max);

                // NOTE actually the direction of the polygons linestring decide, whether it covers the inside or the outside
                // TODO this algorithm currently does not cover all cases of polygons an might compute wrong results,
                //      if the polygons are the other way around
                return this[$coords].every((ring, index) => {
                    let count = index > 0 ? 1 : 0;
                    for (let i = 1; i < ring[$coords].length; i++) {
                        if (ring[$coords][i - 1].lineTo(ring[$coords][i]).intersects(check_line) !== check_line.contains(ring[$coords][i]))
                            count++;
                    }
                    // if the count of intersections with the check_line is even, the point is outside the polygon
                    // though this only applies for the first linear ring, because all further rings are holes
                    // thats why the count is increased for all but the first ring
                    return count % 2 > 0;
                });
            } else {
                return super.contains(that); // TODO
            }
        } // Polygon#contains

        intersects(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            return super.intersects(that); // TODO
        } // Polygon#intersects

        overlaps(that) {
            assert(isGeometry(that), `${this[$name_tag]}#overlaps : invalid @param {Geometry} that`);
            return super.overlaps(that); // TODO
        } // Polygon#overlaps

        touches(that) {
            assert(isGeometry(that), `${this[$name_tag]}#touches : invalid @param {Geometry} that`);
            return super.touches(that); // TODO
        } // Polygon#touches

    } // Polygon

    return Polygon;

}; // module.exports