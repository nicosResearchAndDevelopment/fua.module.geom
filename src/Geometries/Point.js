module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $max_size, $coords,
        assert, lockProp, isGeometry, isPoint
    }
}) => {

    class Point extends geom.Geometry {

        static get [$name]() { return 'Point'; }
        static get [$species]() { return Point; }
        static get [$coord_species]() { return Number; }
        static get [$min_size]() { return 2; }
        static get [$max_size]() { return 3; }

        get x() { return this[$coords][0]; }
        get y() { return this[$coords][1]; }
        get z() { return this[$coords][2]; }

        /**
         * Two sets A and B are equal, if for every point a in A and every point b in B, also a is in B and b is in A.
         * - symmetric
         * @override 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        equals(that) {
            let result;
            if (this === that) {
                result = true;
            } else if (isPoint(that)) {
                result = algo.PointEquality(this, that);
            } else {
                assert(false, `${this[$name_tag]}#equals : ${that} is not supported`);
            }
            // TODO
            return result;
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
            // TODO
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
            // TODO
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
            // TODO
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
            // TODO
        } // Point#touches

    } // Point

    return Point;

}; // module.exports