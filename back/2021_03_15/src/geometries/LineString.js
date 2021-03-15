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

        toLineArray() {
            return this[$coords].slice(1).map(
                (endPoint, startIndex) => this[$coords][startIndex].lineTo(endPoint)
            );
        } // LineString#toLineArray

        intersects(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            let result;

            if (isPoint(that) || isLine(that)) {
                result = this.toLineArray().some(line => line.intersects(that));
                // result = false;
                // for (let i = 1; i < this.size; i++) {
                //     const line = this[$coords][i - 1].lineTo(this[$coords][i]);
                //     if (line.intersects(that)) {
                //         result = true;
                //         break;
                //     }
                // }
            } else if (isLineString(that)) {
                result = this.toLineArray().some(line => that.intersects(line));
                // result = false;
                // for (let j = 1; j < that.size; j++) {
                //     const line = that[$coords][j - 1].lineTo(that[$coords][j]);
                //     if (this.intersects(line)) {
                //         result = true;
                //         break;
                //     }
                // }
            } else {
                result = super.intersects(that);
            }

            return result;
        } // LineString#intersects

        covers(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            let result;

            if (isPoint(that)) {
                result = this.toLineArray().some(line => line.covers(that));
                // result = false;
                // for (let i = 1; i < this.size; i++) {
                //     const line = this[$coords][i - 1].lineTo(this[$coords][i]);
                //     if (line.covers(that)) {
                //         result = true;
                //         break;
                //     }
                // }
            } else {
                result = super.covers(that);
            }

            return result;
        } // LineString#covers

        overlaps(that) {
            assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
            let result;

            if (isLineString(that)) {
                const thatLineArray = that.toLineArray();
                result = this.toLineArray().some(
                    thisLine => thatLineArray.some(
                        thatLine => thisLine.overlaps(thatLine)
                    )
                );
            } else {
                result = super.covers(that);
            }

            return result;
        }

    } // LineString

    return LineString;

}; // module.exports