module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $max_size, $coords, $locked,
        assert, lockProp, isFloat, isGeometry, isPoint, isMultiPoint
    }
}) => {

    const $cached_lines = Symbol('$cached_lines');

    class Point extends geom.Geometry {

        static get [$name]() { return 'Point'; }
        static get [$species]() { return Point; }
        static get [$coord_species]() { return Number; }
        static get [$min_size]() { return 2; }
        static get [$max_size]() { return 3; }

        constructor(...args) {
            super(...args);

            /** @type {WeakMap<Point, Line>} */
            this[$cached_lines] = new WeakMap();
            lockProp(this, $cached_lines);
        } // Point#constructor

        /** @type {Float} */
        get x() { return this[$coords][0]; }
        set x(value) { if (!this[$locked] && isFloat(value)) this[$coords][0] = value; }

        /** @type {Float} */
        get y() { return this[$coords][1]; }
        set y(value) { if (!this[$locked] && isFloat(value)) this[$coords][1] = value; }

        /** @type {Float|undefined} */
        get z() { return this[$coords][2]; }
        set z(value) { if (!this[$locked] && isFloat(value) && this[$coords].length > 2) this[$coords][2] = value; }

        /**
         * @param {Point} point 
         * @returns {Line}
         */
        lineTo(point) {
            if (this[$cached_lines].has(point)) {
                return this[$cached_lines].get(point);
            } else {
                const line = new geom.Line(this, point);
                this[$cached_lines].set(point, line);
                return line;
            }
        } // Point#lineTo

        equals(that) {
            assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
            if (this === that) return true;

            if (isPoint(that)) {
                return algo.PointEquality(this, that);
            } else {
                return that.equals(this);
            }
        } // Point#equals

        contains(that) {
            assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
            return that.equals(this);
        } // Point#contains

        intersects(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            return that.contains(this);
        } // Point#intersects

        overlaps(that) {
            assert(isGeometry(that), `${this[$name_tag]}#overlaps : invalid @param {Geometry} that`);
            return that.overlaps(this);
        } // Point#overlaps

        touches(that) {
            assert(isGeometry(that), `${this[$name_tag]}#touches : invalid @param {Geometry} that`);
            return that.touches(this);
        } // Point#touches

    } // Point

    return Point;

}; // module.exports