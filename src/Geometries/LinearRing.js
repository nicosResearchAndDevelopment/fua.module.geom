const
    {
        PREFIX, REFERENCE_SYSTEM,
        $name, $name_tag, $species, $coord_species, $unique_coords, $min_size, $max_size, $coords,
        assert, lockProp
    }    = require('../module.geom.util.js'),
    algo = require('../algorithms'),
    geom = require('../geometries');

class LinearRing extends geom.LineString {

    static get [$name]() {
        return 'LinearRing';
    }

    static get [$species]() {
        return LinearRing;
    }

    static get [$coord_species]() {
        return geom.Point;
    }

    static get [$min_size]() {
        return 4;
    }

    // NOTE constructor, add, insert and remove had to be wrapped to ensure the linear ring property

    constructor(...args) {
        super(...args);
        assert(this[$coords][0].equals(this[$coords][this.size - 1]));
        this[$coords][this.size - 1] = this[$coords][0];
    } // LinearRing#constructor

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

module.exports = LinearRing;