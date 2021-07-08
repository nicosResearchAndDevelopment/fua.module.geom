const
    {
        PREFIX, REFERENCE_SYSTEM,
        $species, $iterator, $name, $name_tag, $coords, $coord_species, $unique_coords, $min_size, $max_size,
        $locked, $bbox, $serialize, $deserialize,
        assert, lockProp, isObject, isArray, isFloat
    }          = require('../module.geom.util.js'),
    algo       = require('../algorithms'),
    geom       = require('../geometries'),
    isGeometry = (value) => value instanceof geom.Geometry;

class Geometry {

    static get [$name]() {
        return 'Geometry';
    }

    static get [$species]() {
        return Geometry;
    }

    static get [$coord_species]() {
        return Geometry;
    }

    static get [$unique_coords]() {
        return false;
    }

    static get [$min_size]() {
        return 0;
    }

    static get [$max_size]() {
        return Number.MAX_SAFE_INTEGER;
    }

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

    get [$name_tag]() {
        return this[$species][$name];
    }

    get [$iterator]() {
        return this[$coords][$iterator];
    }

    get size() {
        return this[$coords].length;
    }

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
        let coords    = null;
        if (this[$locked]) {
            if (isArray(this[$locked])) {
                coords = this[$locked];
            } else if (species[$coord_species] === Number) {
                coords        = this[$coords];
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
            bbox        = new geom.BBox();
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
            coords  = this.coordinates(),
            result  = {};

        result['@type'] = `${PREFIX}:${species[$name]}`;
        if (coords) result[`${PREFIX}:coordinates`] = coords;
        else result[`${PREFIX}:geometries`] = this[$coords].map(that => that[$serialize]());

        return result;
    } // Geometry#[$serialize]

    /**
     * @param {GeoJSON|GeoJSON~Coordinates} json
     * @returns {Geometry}
     */
    static [$deserialize](json) {
        /** @type {Class<Geometry>} */
        const species = this[Symbol.species];
        let result    = null;

        if (species === Geometry) {
            assert(isObject(json), `Geometry.${$deserialize} : 'invalid @param {Object} json`);
            const
                type        = json['@type'] || json['type'],
                coordinates = json[`${PREFIX}:coordinates`] || json['coordinates'],
                geometries  = json[`${PREFIX}:geometries`] || json['geometries'],
                reference   = json[`${PREFIX}:reference`] || {'@id': REFERENCE_SYSTEM}; // TODO include reference

            switch (type) {

                case geom.Point[$name]:
                case `${PREFIX}:${geom.Point[$name]}`:
                    result = geom.Point.from(coordinates);
                    break;

                case geom.MultiPoint[$name]:
                case `${PREFIX}:${geom.MultiPoint[$name]}`:
                    result = geom.MultiPoint.from(coordinates);
                    break;

                case geom.LineString[$name]:
                case `${PREFIX}:${geom.LineString[$name]}`:
                    result = geom.LineString.from(coordinates);
                    break;

                case geom.MultiLineString[$name]:
                case `${PREFIX}:${geom.MultiLineString[$name]}`:
                    result = geom.MultiLineString.from(coordinates);
                    break;

                case geom.Polygon[$name]:
                case `${PREFIX}:${geom.Polygon[$name]}`:
                    result = geom.Polygon.from(coordinates);
                    break;

                case geom.MultiPolygon[$name]:
                case `${PREFIX}:${geom.MultiPolygon[$name]}`:
                    result = geom.MultiPolygon.from(coordinates);
                    break;

                case geom.GeometryCollection[$name]:
                case `${PREFIX}:${geom.GeometryCollection[$name]}`:
                    result = geom.GeometryCollection.from(geometries);
                    break;

                default:
                    assert(false, `Geometry.${$deserialize} : '${type}' not supported`);

            } // switch (type)
        } else if (Geometry.isPrototypeOf(species)) {
            const coord_species = species[$coord_species];
            assert(isArray(json), `Geometry.${$deserialize} : 'invalid @param {Array} json`);

            if (coord_species === Number) {
                result = new species(...json);
            } else {
                const coords = json.map(coord_species.from.bind(coord_species));
                result       = new species(...coords);
            }
        } // if else

        return result;
    } // Geometry#[$deserialize]

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomequals geom:equals}
     * Two geometries A and B are equal, if:
     * - for every point a in A, a is also in B
     * - and for every point b in B, b is also in A.
     * @param {Geometry} that
     * @returns {boolean}
     */
    equals(that) {
        assert(this.equals !== Geometry.prototype.equals, `${this[$name_tag]}#equals : @interface not implemented`);
        assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
        assert(false, `${this[$name_tag]}#equals : ${that[$name_tag]} not supported`);
    } // Geometry#equals

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomdisjoint geom:disjoint}
     * Two geometries A and B are disjoint, if:
     * - for every point a in A, a is not in B.
     * @param {Geometry} that
     * @returns {boolean}
     */
    disjoint(that) {
        assert(isGeometry(that), `${this[$name_tag]}#disjoint : invalid @param {Geometry} that`);
        return !this.intersects(that);
    } // Geometry#disjoint

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomintersects geom:intersects}
     * Two geometries A and B intersect, if:
     * - their exists at least one point a in A, that is also in B.
     * @param {Geometry} that
     * @returns {boolean}
     */
    intersects(that) {
        assert(this.intersects !== Geometry.prototype.intersects, `${this[$name_tag]}#intersects : @interface not implemented`);
        assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
        assert(false, `${this[$name_tag]}#intersects : ${that[$name_tag]} not supported`);
    } // Geometry#intersects

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomtouches-geommeets geom:touches, geom:meets}
     * Two geometries A and B are touching, if:
     * - for every point a in the interior of A, a is not in the interior of B
     * - and at least one point c on the boundary of A is on the boundary of B.
     * @param {Geometry} that
     * @returns {boolean}
     */
    touches(that) {
        assert(this.touches !== Geometry.prototype.touches, `${this[$name_tag]}#touches : @interface not implemented`);
        assert(isGeometry(that), `${this[$name_tag]}#touches : invalid @param {Geometry} that`);
        assert(false, `${this[$name_tag]}#touches : ${that[$name_tag]} not supported`);
    } // Geometry#touches

    meets(that) {
        assert(isGeometry(that), `${this[$name_tag]}#meets : invalid @param {Geometry} that`);
        return this.touches(that);
    } // Geometry#meets

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomcontains geom:contains}
     * A geometry A contains a geometry B, if:
     * - for every point b in B, b is also in A
     * - and at least one point c in the interior of B is also in the interior of A.
     * @param {Geometry} that
     * @returns {boolean}
     */
    contains(that) {
        assert(this.contains !== Geometry.prototype.contains, `${this[$name_tag]}#contains : @interface not implemented`);
        assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
        assert(false, `${this[$name_tag]}#contains : ${that[$name_tag]} not supported`);
    } // Geometry#contains

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomoverlaps geom:overlaps}
     * The geometries A and B are overlapping, if:
     * - A intersects B
     * - and the dimension of the intersection is the same as the dimension of A and B.
     * @param {Geometry} that
     * @returns {boolean}
     */
    overlaps(that) {
        assert(this.overlaps !== Geometry.prototype.overlaps, `${this[$name_tag]}#overlaps : @interface not implemented`);
        assert(isGeometry(that), `${this[$name_tag]}#overlaps : invalid @param {Geometry} that`);
        assert(false, `${this[$name_tag]}#overlaps : ${that[$name_tag]} not supported`);
    } // Geometry#overlaps

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomcovers geom:covers}
     * A geometry A covers a geometry B, if:
     * - at least one point b in B is also in A
     * - and there exists no point in B, which is in the exterior of A.
     * @param {Geometry} that
     * @returns {boolean}
     */
    covers(that) {
        assert(this.covers !== Geometry.prototype.covers, `${this[$name_tag]}#covers : @interface not implemented`);
        assert(isGeometry(that), `${this[$name_tag]}#covers : invalid @param {Geometry} that`);
        assert(false, `${this[$name_tag]}#covers : ${that[$name_tag]} not supported`);
    } // Geometry#covers

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomcoveredby geom:coveredBy}
     * A geometry A is coveredBy a geometry B, if:
     * - at least one point a in A is also in B
     * - and there exists no point in A, which is in the exterior of B.
     * @param {Geometry} that
     * @returns {boolean}
     */
    coveredBy(that) {
        assert(isGeometry(that), `${this[$name_tag]}#coveredBy : invalid @param {Geometry} that`);
        return that.covers(this);
    } // Geometry#coveredBy

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geominside-geomwithin geom:inside, geom:within}
     * A geometry A is inside a geometry B, if:
     * - for every point a in A, a is not in the exterior of B
     * - and at least one point c in A is also in the interior of B.
     * @param {Geometry} that
     * @returns {boolean}
     */
    inside(that) {
        assert(isGeometry(that), `${this[$name_tag]}#inside : invalid @param {Geometry} that`);
        return that.contains(this);
    } // Geometry#inside

    within(that) {
        assert(isGeometry(that), `${this[$name_tag]}#within : invalid @param {Geometry} that`);
        return that.contains(this);
    } // Geometry#within

    /**
     * {@link https://github.com/nicosResearchAndDevelopment/nrd-motic/blob/master/decide/operator/geometry.md#geomcrosses geom:crosses}
     * A geometry A crosses a geometry B, if:
     * - A intersects B
     * - and the dimension of the intersection is less than the maximum dimension of A and B.
     * @param {Geometry} that
     * @returns {boolean}
     */
    crosses(that) {
        assert(this.crosses !== Geometry.prototype.crosses, `${this[$name_tag]}#crosses : @interface not implemented`);
        assert(isGeometry(that), `${this[$name_tag]}#crosses : invalid @param {Geometry} that`);
        assert(false, `${this[$name_tag]}#crosses : ${that[$name_tag]} not supported`);
    } // Geometry#crosses

} // Geometry

module.exports = Geometry;