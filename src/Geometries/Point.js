module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $max_size, $coords, $locked,
        assert, lockProp, isFloat, isGeometry, isPoint, isMultiPoint, isGeometryCollection
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
         * @param {Point} that 
         * @returns {Line}
         */
        lineTo(that) {
            let result = this[$cached_lines].get(that);

            if (!result) {
                result = new geom.Line(this, that);
                this[$cached_lines].set(that, result);
            }

            return result;
        } // Point#lineTo

        equals(that) {
            assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
            let result;

            if (isPoint(that))
                result = algo.equals.Point_Point(this, that);
            else if (isMultiPoint(that) || isGeometryCollection(that))
                result = that.equals(this);
            else
                result = false;

            return result;
        } // Point#equals

    } // Point

    return Point;

}; // module.exports