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
                this.min.x = Math.min(this.min.x, that.x + tolerance);
                this.min.y = Math.min(this.min.y, that.y + tolerance);
                this.max.x = Math.max(this.max.x, that.x - tolerance);
                this.max.y = Math.max(this.max.y, that.y - tolerance);
            } else if (isLine(that)) {
                this.min.x = Math.min(this.min.x, that.from.x + tolerance, that.to.x + tolerance);
                this.min.y = Math.min(this.min.y, that.from.y + tolerance, that.to.y + tolerance);
                this.max.x = Math.max(this.max.x, that.from.x - tolerance, that.to.x - tolerance);
                this.max.y = Math.max(this.max.y, that.from.y - tolerance, that.to.y - tolerance);
            } else if (isMultiPoint(that) || isLineString(that)) {
                this.min.x = Math.min(this.min.x, ...(that[$coords].map(coord => coord.x + tolerance)));
                this.min.y = Math.min(this.min.y, ...(that[$coords].map(coord => coord.y + tolerance)));
                this.max.x = Math.max(this.max.x, ...(that[$coords].map(coord => coord.x - tolerance)));
                this.max.y = Math.max(this.max.y, ...(that[$coords].map(coord => coord.y - tolerance)));
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

        contains(that) {
            assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
            let result;

            if (isPoint(that)) {
                result = algo.contains.BBox_Point(this, that);
            } else if (isBBox(that)) {
                result = algo.contains.BBox_BBox(this, that);
            } else {
                for (let coord of that[$coords]) {
                    if (!this.contains(coord)) {
                        result = false;
                        break;
                    }
                }
                if (result === undefined)
                    result = true;
            }

            return result;
        } // BBox#contains

        intersects(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            let result;

            if (isPoint(that)) {
                result = algo.contains.BBox_Point(this, that);
            } if (isBBox(that)) {
                result = algo.intersects.BBox_BBox(this, that);
            } else {
                for (let coord of that[$coords]) {
                    if (this.intersects(coord)) {
                        result = true;
                        break;
                    }
                }
                if (result === undefined)
                    result = false;
            }

            return result;
        } // BBox#intersects

    } // BBox

    return BBox;

}; // module.exports