module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $unique_coords, $min_size, $max_size, $coords,
        assert, lockProp, isGeometry, isPoint, isLine, isLineString, isMultiLineString
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

        equals(that) {
            assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
            if (this === that) return true;

            if (isLine(that)) {
                return (algo.PointEquality(this.from, that.from) && algo.PointEquality(this.to, that.to))
                    || (algo.PointEquality(this.from, that.to) && algo.PointEquality(this.to, that.from));
            } else {
                return super.equals(that);
            }
        } // Line#equals

        contains(that) {
            assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);

            if (isPoint(that)) {
                return algo.LineContainment(this, that);
            } else if (isLine(that)) {
                return algo.LineContainment(this, that.from) && algo.LineContainment(this, that.to);
            } else {
                return super.contains(that);
            }
        } // Line#contains

        intersects(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);

            if (isPoint(that)) {
                return algo.LineContainment(this, that);
            } else if (isLine(that)) {
                return algo.LineIntersection(this, that);
            } else {
                return super.intersects(that);
            }
        } // Line#intersects

        overlaps(that) {
            assert(isGeometry(that), `${this[$name_tag]}#overlaps : invalid @param {Geometry} that`);

            if (isPoint(that)) {
                return algo.LineContainment(this, that);
            } else if (isLine(that)) {
                if (this.contains(that.from)) {
                    return this.contains(that.to)
                        || that.contains(this.from)
                        || that.contains(this.to);
                } else if (this.contains(that.to)) {
                    return that.contains(this.from)
                        || that.contains(this.to);
                } else if (that.contains(this.from)) {
                    return that.contains(this.to);
                } else {
                    return false;
                }
            } else {
                return super.overlaps(that);
            }
        } // Line#overlaps

        touches(that) {
            assert(isGeometry(that), `${this[$name_tag]}#touches : invalid @param {Geometry} that`);
            return super.touches(that); // TODO
        } // Line#touches

    } // Line

    return Line;

}; // module.exports