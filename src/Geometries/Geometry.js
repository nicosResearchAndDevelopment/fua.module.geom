module.exports = ({
    geom, algo, util: {
        $species, $iterator, $name, $name_tag, $coords, $coord_species, $min_size, $max_size, $locked, $serialize,
        assert, lockProp, isObject, isArray, isNumber, isBoolean, isFloat, isGeometry, isPosition
    }
}) => {

    class Geometry {

        static get [$name]() { return 'Geometry'; }
        static get [$species]() { return Geometry; }
        static get [$coord_species]() { return Geometry; }
        static get [$min_size]() { return 0; }
        static get [$max_size]() { return Number.MAX_SAFE_INTEGER; }

        /**
         * @typedef {Class<Geometry|Number>} CoordSpecies
         * 
         * @abstract
         * @param {...CoordSpecies} coords
         */
        constructor(...coords) {

            const species = new.target;

            assert(species !== Geometry,
                `${species[$name_tag]}#constructor : is @abstract`);
            assert(coords.length >= species[$min_size],
                `${species[$name_tag]}#constructor : expected at least ${species[$min_size]} arguments`);
            assert(coords.length <= species[$max_size],
                `${species[$name_tag]}#constructor : expected at maximum ${species[$max_size]} arguments`);
            if (species[$coord_species] === Number) assert(coords.every(isFloat),
                `${species[$name_tag]}#constructor : invalid @param {...Number} args`);
            else assert(coords.every(val => val instanceof species[$coord_species]),
                `${species[$name_tag]}#constructor : invalid @param {...${species[$coord_species][$name]}} args`);

            /** @type {Class<Geometry>} */
            this[$species] = species;
            lockProp(this, $species);

            /** @type {Array<CoordSpecies>} */
            this[$coords] = coords;
            lockProp(this, $coords);

        } // Geometry#constructor

        get [$name_tag]() { return this[$species][$name]; }
        get [$iterator]() { return this[$coords][$iterator]; }

        /**
         * @returns {Boolean}
         */
        lock() {
            if (this[$locked]) return false;
            Object.freeze(this[$coords]);
            this[$locked] = true;
            if (this[$species][$coord_species] !== Number) {
                for (let child of this[$coords]) {
                    child.lock();
                }
            }
            return true;
        } // Geometry#lock

        /**
         * @type {Array<Array|Number>}
         */
        get coordinates() {
            const species = this[$species];
            let coords = null;
            if (this[$locked]) {
                if (isArray(this[$locked])) {
                    coords = this[$locked];
                } else if (species[$coord_species] === Number) {
                    coords = this[$coords];
                    this[$locked] = coords;
                } else if (species[$coord_species] !== Geometry) {
                    coords = this[$coords].map(that => that.coordinates).filter(that => that);
                    Object.freeze(coords);
                    this[$locked] = coords;
                }
            } else {
                if (species[$coord_species] === Number) {
                    coords = this[$coords].map(value => value);
                } else if (species[$coord_species] !== Geometry) {
                    coords = this[$coords].map(that => that.coordinates);
                }
            }
            return coords;
        } // Geometry#coordinates

        /**
         * @returns {JSON}
         */
        [$serialize]() {
            const
                species = this[$species],
                coords = this.coordinates,
                result = {};

            result['type'] = species[$name];
            if (coords) result['coordinates'] = coords;
            else result['geometries'] = this[$coords].map(that => that[$serialize]());

            return result;
        } // Geometry#[$serialize]

        // static from(arg) {
        //     /** @type {Class<Geometry>} */
        //     const targetType = this[Symbol.species];
        //     if (targetType === Geometry) {
        //         assert(isObject(arg), `Geometry.from : invalid @param {Object} arg`);
        //         switch (arg['type']) {
        //             case 'Point': return geom.Point.from(arg['coordinates']);
        //             case 'MultiPoint': return geom.MultiPoint.from(arg['coordinates']);
        //             case 'LineString': return geom.LineString.from(arg['coordinates']);
        //             case 'MultiLineString': return geom.MultiLineString.from(arg['coordinates']);
        //             case 'Polygon': return geom.Polygon.from(arg['coordinates']);
        //             case 'MultiPolygon': return geom.MultiPolygon.from(arg['coordinates']);
        //             case 'GeometryCollection': return geom.GeometryCollection.from(arg['geometries']);
        //             default: assert(false, `Geometry.from : unknown type ${arg['type']}`);
        //         }
        //     } else if (Geometry.isPrototypeOf(targetType)) {
        //         const child_species = targetType[$coord_species];
        //         if (child_species === Number) {
        //             assert(isArray(arg) || isPosition(arg) || isFloatArray(arg),
        //                 `Geometry.from : invalid @param {Array|FloatArray} arg`);
        //             return new targetType(...arg);
        //         } else {
        //             assert(isArray(arg),
        //                 `Geometry.from : invalid @param {Array} arg`);
        //             return new targetType(...(arg.map(child_species.from.bind(child_species))));
        //         }
        //     }
        // } // Geometry.from

        /**
         * Two sets A and B are equal, if for every point a in A and every point b in B, also a is in B and b is in A.
         * - symmetric
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        equals(that) {
            assert(false, `${this[$name_tag]}#equals : @interface not implemented`);
        } // Geometry#equals

        /**
         * A set A contains a set B, if for every point b in B, also b is in A.
         * If two sets contain each other, they must be equal.
         * - not symmetric
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        contains(that) {
            assert(false, `${this[$name_tag]}#contains : @interface not implemented`);
        } // Geometry#contains

        /**
         * A set A intersects a set B, if there exists a point p, such that p is in A and also in B.
         * - symmetric
         * - opposite of disjoint
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        intersects(that) {
            assert(false, `${this[$name_tag]}#intersects : @interface not implemented`);
        } // Geometry#intersects

        /**
         * A set A overlaps a set B, if A intersects B, but A does not just touch B.
         * Also the intersection shall have at least the dimensionality of the minimum dimensionality of the two sets.
         * - symmetric
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        overlaps(that) {
            assert(false, `${this[$name_tag]}#overlaps : @interface not implemented`);
        } // Geometry#overlaps

        /**
         * Two sets are touching, if they intersect and their intersection only includes their boundaries. 
         * Also the tangent vectors of both sets at the point(s) of intersection should point in the same direction. 
         * Also the intersection shall have at least 1 times less dimensionality than the maximum dimensionality of the two sets.
         * - symmetric
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        touches(that) {
            assert(false, `${this[$name_tag]}#touches : @interface not implemented`);
        } // Geometry#touches

        /**
         * A set A is disjoint with a set B, if there exists no point p, such that p is in A and also in B.
         * - symmetric
         * - opposite of intersects
         * @param {Geometry} that 
         * @returns {boolean}
         */
        disjoint(that) {
            return !this.intersects(that);
        } // Geometry#disjoint

    } // Geometry

    return Geometry;

}; // module.exports