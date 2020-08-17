module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $coords,
        assert, lockProp, isGeometry, isPoint, isLine, isLineString, isPolygon
    }
}) => {

    class LineString extends geom.Geometry {

        static get [$name]() { return 'LineString'; }
        static get [$species]() { return LineString; }
        static get [$coord_species]() { return geom.Point; }
        static get [$min_size]() { return 2; }

        // equals(that) {
        //     assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
        //     if (this === that) return true;
        //     return super.equals(that); // TODO
        // } // LineString#equals

        // contains(that) {
        //     assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
        //     if (isPoint(that)) {
        //         for (let i = 1; i < this.size; i++) {
        //             if (this[$coords][i - 1].lineTo(this[$coords][i]).contains(that))
        //                 return true;
        //         }
        //         return false;
        //     } else {
        //         return super.contains(that); // TODO
        //     }
        // } // LineString#contains

        // intersects(that) {
        //     assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
        //     if (isPoint(that)) {
        //         return this.contains(that);
        //     } else if (isLine(that)) {
        //         for (let i = 1; i < this.size; i++) {
        //             if (this[$coords][i - 1].lineTo(this[$coords][i]).intersects(that))
        //                 return true;
        //         }
        //         return false;
        //     } else if (isLineString(that)) {
        //         for (let i = 1; i < this.size; i++) {
        //             if (that.intersects(this[$coords][i - 1].lineTo(this[$coords][i])))
        //                 return true;
        //         }
        //         return false;
        //     } else {
        //         return that.intersects(this);
        //     }
        // } // LineString#intersects

    } // LineString

    return LineString;

}; // module.exports