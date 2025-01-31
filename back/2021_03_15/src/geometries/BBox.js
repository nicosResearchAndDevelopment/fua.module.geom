module.exports = ({
    geom, algo, conf: {
        tolerance
    }, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $max_size, $coords, $locked, $bbox,
        assert, isGeometry, isBBox, isPoint, isLine, isMultiPoint, isLineString
    }
}) => {

    class BBox extends geom.Geometry {

        static get [$name]() { return 'BBox'; }
        static get [$species]() { return BBox; }
        static get [$coord_species]() { return geom.Point; }
        static get [$min_size]() { return 2; }
        static get [$max_size]() { return 2; }

        constructor() {
            super(
                new geom.Point(Infinity, Infinity),
                new geom.Point(-Infinity, -Infinity)
            );
        }

        /** @type {Point} */
        get min() { return this[$coords][0]; }

        /** @type {Point} */
        get max() { return this[$coords][1]; }

        /**
         * @returns {Boolean}
         */
        lock() {
            if (this[$locked]) return false;
            Object.freeze(this[$coords]);
            this[$locked] = true;
            this[$bbox] = this;
            this.min.lock();
            this.max.lock();
            return true;
        } // BBox#lock

        /**
         * @return {Geometry} this
         */
        reset() {
            if (this[$locked]) return this;
            this.min.x = Infinity;
            this.min.y = Infinity;
            this.max.x = -Infinity;
            this.max.y = -Infinity;
            return this;
        } // BBox#reset

        /**
         * @param {Geometry} that 
         * @return {Geometry} this
         */
        include(that) {
            if (this[$locked]) return this;
            assert(isGeometry(that), `${this[$name_tag]}#include : invalid @param {Geometry} that`);
            if (isPoint(that)) {
                this.min.x = Math.min(this.min.x, that.x);
                this.min.y = Math.min(this.min.y, that.y);
                this.max.x = Math.max(this.max.x, that.x);
                this.max.y = Math.max(this.max.y, that.y);
            } else if (isLine(that)) {
                this.min.x = Math.min(this.min.x, that.from.x, that.to.x);
                this.min.y = Math.min(this.min.y, that.from.y, that.to.y);
                this.max.x = Math.max(this.max.x, that.from.x, that.to.x);
                this.max.y = Math.max(this.max.y, that.from.y, that.to.y);
            } else if (isMultiPoint(that) || isLineString(that)) {
                this.min.x = Math.min(this.min.x, ...(that[$coords].map(coord => coord.x)));
                this.min.y = Math.min(this.min.y, ...(that[$coords].map(coord => coord.y)));
                this.max.x = Math.max(this.max.x, ...(that[$coords].map(coord => coord.x)));
                this.max.y = Math.max(this.max.y, ...(that[$coords].map(coord => coord.y)));
            } else if (isBBox(that)) {
                this.min.x = Math.min(this.min.x, that.min.x);
                this.min.y = Math.min(this.min.y, that.min.y);
                this.max.x = Math.max(this.max.x, that.max.x);
                this.max.y = Math.max(this.max.y, that.max.y);
            } else if (that[$species][$coord_species] !== Number) {
                for (let coord of that[$coords]) {
                    this.include(coord);
                }
            }
            return this;
        } // BBox#include

        covers(that) {
            assert(isGeometry(that), `${this[$name_tag]}#covers : invalid @param {Geometry} that`);
            let result;

            if (isPoint(that))
                result = algo.covers.BBox_Point(this, that);
            else if (isBBox(that))
                result = algo.covers.BBox_BBox(this, that);
            else
                result = that.size > 0
                    && that[$coords].every(coord => this.covers(coord));

            return result;
        } // BBox#covers

    } // BBox

    return BBox;

}; // module.exports