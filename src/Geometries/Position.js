module.exports = ({
    geom, algo, util: {
        $species, $iterator, $name_tag, $children, $child_species, $min_childs, $max_childs,
        assert, lockProp, isNumber
    }
}) => {

    const
        $lineMap = Symbol("LINE_MAP");

    class Position extends Float64Array {

        get [$name_tag]() { return "Position"; }
        static get [$species]() { return Position; }

        /**
         * @param  {Number} length 
         */
        constructor(length) {
            assert(isNumber(length) && length >= 2, "Position#constructor : invalid @param {Number} length : expected >= 2");
            super(length);
            /** @type {WeakMap<Position, Line>} */
            this[$lineMap] = new WeakMap();
            lockProp(this, $lineMap);
        } // Position#constructor

        get x() { return this[0]; }
        get long() { return this[0]; }
        get longitude() { return this[0]; }

        get y() { return this[1]; }
        get lat() { return this[1]; }
        get latitude() { return this[1]; }

        get z() { return this[2]; }
        get alt() { return this[2]; }
        get altitude() { return this[2]; }

        $serialize() {
            return Array.from(this);
        } // Position#$serialize

        /**
         * @param {Position} that 
         * @returns {Line} 
         */
        $to(that) {
            /** @type {Line} */
            let line = this[$lineMap].get(that);
            if (!line) {
                line = new geom.Line(this, that);
                this[$lineMap].set(that, line);
            }
            return line;
        } // Position#$to

        /**
         * @param {Position} that 
         * @param {Float} [tolerance=Number.EPSILON] 
         * @returns {Boolean} 
         */
        equals(that, tolerance = Number.EPSILON) {
            return (this === that) || (
                this.x >= that.x - tolerance &&
                this.x <= that.x + tolerance &&
                this.y >= that.y - tolerance &&
                this.y <= that.y + tolerance
            );
        } // Position#equals

    } // Position

    return Position;

}; // module.exports