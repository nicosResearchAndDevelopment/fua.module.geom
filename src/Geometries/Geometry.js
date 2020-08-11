module.exports = ({
    geom, algo, util: {
        $species, $iterator, $name, $name_tag, $coords, $coord_species, $unique_coords, $min_size, $max_size,
        $locked, $bbox, $serialize, $deserialize,
        assert, lockProp, isObject, isArray, isFloat, isBoolean, isGeometry, isPoint, isLine, isBBox
    }
}) => {

    class Geometry {

        static get [$name]() { return 'Geometry'; }
        static get [$species]() { return Geometry; }
        static get [$coord_species]() { return Geometry; }
        static get [$unique_coords]() { return false; }
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
        get size() { return this[$coords].length; }

        /**
         * @param {Boolean} [deep=true]
         * @returns {Boolean}
         */
        lock(deep = true) {
            if (this[$locked]) return false;
            Object.freeze(this[$coords]);
            this[$locked] = true;
            if (deep && this[$species][$coord_species] !== Number) {
                for (let that of this[$coords]) {
                    that.lock();
                }
            }
            return true;
        } // Geometry#lock

        /**
         * @returns {Array<Array|Number>}
         */
        coordinates() {
            const species = this[$species];
            let coords = null;
            if (this[$locked]) {
                if (isArray(this[$locked])) {
                    coords = this[$locked];
                } else if (species[$coord_species] === Number) {
                    coords = this[$coords];
                    this[$locked] = coords;
                } else if (species[$coord_species] !== Geometry) {
                    coords = this[$coords].map(that => that.coordinates()).filter(that => that);
                    Object.freeze(coords);
                    this[$locked] = coords;
                }
            } else {
                if (species[$coord_species] === Number) {
                    coords = this[$coords].map(value => value);
                } else if (species[$coord_species] !== Geometry) {
                    coords = this[$coords].map(that => that.coordinates());
                }
            }
            return coords;
        } // Geometry#coordinates

        /**
         * @param {Boolean} [refresh=false]
         * @returns {Line|Point}
         */
        bbox(refresh = false) {
            let bbox = this[$bbox];

            if (!bbox) {
                bbox = new geom.BBox();
                this[$bbox] = bbox;
                lockProp(this, $bbox);
                bbox.include(this);
                if (this[$locked]) bbox.lock();
            } else if (refresh && !bbox[$locked]) {
                bbox.reset().include(this);
                if (this[$locked]) bbox.lock();
            }

            return bbox;
        } // Geometry#bbox

        /**
         * @param {CoordSpecies} coord 
         * @returns {Boolean}
         */
        add(coord) {
            assert(!this[$locked], `${this[$name_tag]}#add : locked`);
            const species = this[$species], coord_species = species[$coord_species];
            if (coord_species === Number) assert(isFloat(coord), `${this[$name_tag]}#add : invalid @param {Float} coord`);
            else assert(coord instanceof coord_species, `${this[$name_tag]}#add : invalid @param {${coord_species[$name]}} coord`);
            assert(this.size < species[$max_size], `${this[$name_tag]}#add : reached maximum size of ${species[$max_size]}`);

            if (this[$unique_coords] && this[$coords].includes(coord)) return false;
            this[$coords].push(coord);
            return true;
        } // Geometry#add

        /**
         * @param {CoordSpecies} coord 
         * @returns {Boolean}
         */
        insert(coord) {
            assert(!this[$locked], `${this[$name_tag]}#insert : locked`);
            const species = this[$species], coord_species = species[$coord_species];
            if (coord_species === Number) assert(isFloat(coord), `${this[$name_tag]}#insert : invalid @param {Float} coord`);
            else assert(coord instanceof coord_species, `${this[$name_tag]}#insert : invalid @param {${coord_species[$name]}} coord`);
            assert(this.size < species[$max_size], `${this[$name_tag]}#insert : reached maximum size of ${species[$max_size]}`);

            if (this[$unique_coords] && this[$coords].includes(coord)) return false;
            this[$coords].unshift(coord);
            return true;
        } // Geometry#insert

        /**
         * @param {CoordSpecies} coord 
         * @returns {Boolean}
         */
        remove(coord) {
            assert(!this[$locked], `${this[$name_tag]}#remove : locked`);
            const species = this[$species];
            assert(this.size > species[$min_size], `${this[$name_tag]}#remove : reached minimum size of ${species[$min_size]}`);

            const index = this[$coords].lastIndexOf(coord);
            if (index < 0) return false;
            this[$coords].splice(index, 1);
            return true;
        } // Geometry#remove

        /**
         * @returns {GeoJSON}
         */
        [$serialize]() {
            const
                species = this[$species],
                coords = this.coordinates(),
                result = {};

            result['type'] = species[$name];
            if (coords) result['coordinates'] = coords;
            else result['geometries'] = this[$coords].map(that => that[$serialize]());

            return result;
        } // Geometry#[$serialize]

        /**
         * @param {GeoJSON|GeoJSON~Coordinates} json 
         * @returns {Geometry}
         */
        static [$deserialize](json) {
            /** @type {Class<Geometry>} */
            const species = this[Symbol.species];
            if (species === Geometry) {
                assert(isObject(json), `Geometry.${$deserialize} : 'invalid @param {Object} json`);
                const { 'type': type, 'coordinates': coordinates, 'geometries': geometries } = json;
                switch (type) {
                    case 'Point': return geom.Point.from(coordinates);
                    case 'MultiPoint': return geom.MultiPoint.from(coordinates);
                    case 'LineString': return geom.LineString.from(coordinates);
                    case 'MultiLineString': return geom.MultiLineString.from(coordinates);
                    case 'Polygon': return geom.Polygon.from(coordinates);
                    case 'MultiPolygon': return geom.MultiPolygon.from(coordinates);
                    case 'GeometryCollection': return geom.GeometryCollection.from(geometries);
                    default: assert(false, `Geometry.${$deserialize} : '${type}' not supported`);
                }
            } else if (Geometry.isPrototypeOf(species)) {
                const coord_species = species[$coord_species];
                assert(isArray(json), `Geometry.${$deserialize} : 'invalid @param {Array} json`);
                if (coord_species === Number) {
                    return new species(...json);
                } else {
                    const coords = json.map(coord_species.from.bind(coord_species));
                    return new species(...coords);
                }
            }
        } // Geometry#[$deserialize]

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