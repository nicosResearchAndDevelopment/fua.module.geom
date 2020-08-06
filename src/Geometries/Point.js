module.exports = ({
    geom, algo, util: {
        $species, $iterator, $name, $name_tag, $children, $child_species, $min_childs, $max_childs,
        assert, lockProp, isNumber, isPoint
    }
}) => {

    class Point extends geom.Geometry {

        static get [$name]() { return "Point"; }
        static get [$species]() { return Point; }
        static get [$child_species]() { return Number; }
        static get [$min_childs]() { return 2; }
        static get [$max_childs]() { return 3; }

        get x() { return this[$children][0]; }
        get y() { return this[$children][1]; }
        get z() { return this[$children][2]; }

        /**
         * Two sets A and B are equal, if for every point a in A and every point b in B, also a is in B and b is in A.
         * - symmetric
         * @override 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        equals(that) {
            if (this === that) return true;

            if (isPoint(that)) {
                return algo.PointEquality(this, that);
            } else {
                assert(false, `${this[$name_tag]}#equals : that is not supported`);
            }



            switch (that[$name_tag]) {

                case "Point":
                    return this[$children].equals(that[$children]);

                case "MultiPoint":
                    return that.equals(this);

                case "LineString":
                    return false;

                case "MultiLineString":
                    return false;

                case "Polygon":
                    return false;

                case "MultiPolygon":
                    return false;

                case "GeometryCollection":
                    return that.equals(this);

                default:
                    assert(false, `Point#equals : unknown type ${that[$name_tag]}`);

            } // switch
        } // Point#equals

        /**
         * A set A contains a set B, if for every point b in B, also b is in A.
         * If two sets contain each other, they must be equal.
         * - not symmetric
         * @override 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        contains(that) {
            switch (that[$name_tag]) {

                case "Point":
                    return this.equals(that);

                case "MultiPoint":
                    return that.equals(this);

                case "LineString":
                    return false;

                case "MultiLineString":
                    return false;

                case "Polygon":
                    return false;

                case "MultiPolygon":
                    return false;

                case "GeometryCollection":
                    return super.contains(that); // TODO implement

                default:
                    assert(false, `Point#contains : unknown type ${that[$name_tag]}`);

            } // switch
        } // Point#contains

        /**
         * A set A intersects a set B, if there exists a point p, such that p is in A and also in B.
         * - symmetric
         * - opposite of disjoint
         * @override 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        intersects(that) {
            switch (that[$name_tag]) {

                case "Point":
                    return this.equals(that);

                case "MultiPoint":
                    return that.intersects(this);

                case "LineString":
                    return that.intersects(this);

                case "MultiLineString":
                    return that.intersects(this);

                case "Polygon":
                    return that.intersects(this);

                case "MultiPolygon":
                    return that.intersects(this);

                case "GeometryCollection":
                    return that.intersects(this);

                default:
                    assert(false, `Point#intersects : unknown type ${that[$name_tag]}`);

            } // switch
        } // Point#intersects

        /**
         * A set A overlaps a set B, if A intersects B, but A does not just touch B.
         * Also the intersection shall have at least the dimensionality of the minimum dimensionality of the two sets.
         * - symmetric
         * @override 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        overlaps(that) {
            switch (that[$name_tag]) {

                case "Point":
                    return super.overlaps(that); // TODO implement

                case "MultiPoint":
                    return super.overlaps(that); // TODO implement

                case "LineString":
                    return super.overlaps(that); // TODO implement

                case "MultiLineString":
                    return super.overlaps(that); // TODO implement

                case "Polygon":
                    return super.overlaps(that); // TODO implement

                case "MultiPolygon":
                    return super.overlaps(that); // TODO implement

                case "GeometryCollection":
                    return super.overlaps(that); // TODO implement

                default:
                    assert(false, `Point#overlaps : unknown type ${that[$name_tag]}`);

            } // switch
        } // Point#overlaps

        /**
         * Two sets are touching, if they intersect and their intersection only includes their boundaries. 
         * Also the tangent vectors of both sets at the point(s) of intersection should point in the same direction. 
         * Also the intersection shall have at least 1 times less dimensionality than the maximum dimensionality of the two sets.
         * - symmetric
         * @override 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        touches(that) {
            super.touches(that);
            switch (that[$name_tag]) {

                case "Point":
                    return super.touches(that); // TODO implement

                case "MultiPoint":
                    return super.touches(that); // TODO implement

                case "LineString":
                    return super.touches(that); // TODO implement

                case "MultiLineString":
                    return super.touches(that); // TODO implement

                case "Polygon":
                    return super.touches(that); // TODO implement

                case "MultiPolygon":
                    return super.touches(that); // TODO implement

                case "GeometryCollection":
                    return super.touches(that); // TODO implement

                default:
                    assert(false, `Point#touches : unknown type ${that[$name_tag]}`);

            } // switch
        } // Point#touches

    } // Point

    return Point;

}; // module.exports