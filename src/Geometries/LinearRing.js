module.exports = ({
    geom, algo, util: {
        $name, $name_tag, $species, $coord_species, $min_size, $coords,
        assert, lockProp, isPoint
    }
}) => {

    class LinearRing extends geom.LineString {

        static get [$name]() { return 'LinearRing'; }
        static get [$species]() { return LinearRing; }
        static get [$coord_species]() { return geom.Point; }
        static get [$min_size]() { return 4; }

        // NOTE constructor, add, insert and remove had to be wrapped to ensure the linear ring property

        constructor(...args) {
            super(...args);
            assert(this[$coords][0].equals(this[$coords][this.size - 1]));
            this[$coords][this.size - 1] = this[$coords][0];
        } // LinearRing#constructor

        testPoint(from, to) {
            // TODO temp
            assert(isPoint(from) && isPoint(to), `${this[$name_tag]}#testPoint : invalid @param {Point} from/to`);
            let result = "";
            const check_line = from.lineTo(to);
            const ax = check_line.to.x - check_line.from.x;
            const ay = check_line.to.y - check_line.from.y;
            for (let i = 1; i < this.size; i++) {
                const line = this[$coords][i - 1].lineTo(this[$coords][i]);
                if (line.intersects(check_line)) {
                    const bx = line.to.x - line.from.x;
                    const by = line.to.y - line.from.y;
                    const indicator = Math.sign(ax * by - ay * bx);
                    if (indicator > 0) result += "+";
                    if (indicator < 0) result += "-";
                }
            }
            result = result
                .replace(/\+\+/g, "+")
                .replace(/--/g, "-")
                .replace(/\+-|-\+/g, "");
            return result;
        }

        add(coord) {
            if (super.add(coord)) {
                this[$coords][this.size - 2] = this[$coords][this.size - 1];
                this[$coords][this.size - 1] = this[$coords][0];
            }
        } // LinearRing#add

        insert(coord) {
            if (super.insert(coord)) {
                this[$coords][this.size - 1] = this[$coords][0];
            }
        } // LinearRing#insert

        remove(coord) {
            if (super.remove(coord)) {
                this[$coords][this.size - 1] = this[$coords][0];
            }
        } // LinearRing#remove

    } // LinearRing

    return LinearRing;

}; // module.exports