const
    {
        PREFIX, REFERENCE_SYSTEM,
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp, isBoolean
    }                    = require('../module.geom.util.js'),
    algo                 = require('../algorithms'),
    geom                 = require('../geometries'),
    isGeometry           = (value) => value instanceof geom.Geometry,
    isPoint              = (value) => value instanceof geom.Point,
    isMultiPoint         = (value) => value instanceof geom.MultiPoint,
    isGeometryCollection = (value) => value instanceof geom.GeometryCollection;

class MultiPoint extends geom.Geometry {

    static get [$name]() {
        return 'MultiPoint';
    }

    static get [$species]() {
        return MultiPoint;
    }

    static get [$coord_species]() {
        return geom.Point;
    }

    static get [$unique_coords]() {
        return true;
    }

    equals(that) {
        assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
        let result;

        if (this === that)
            result = true;
        if (isPoint(that))
            result = this.size > 0
                && this[$coords].some(coord => coord.equals(that));
        else if (isMultiPoint(that) || isGeometryCollection(that))
            result = (this.size > 0 && that.size > 0
                && this[$coords].every(coord => that.contains(coord))
                && that[$coords].every(coord => this.contains(coord))
            ) || (this.size === 0 && that.size === 0);
        else
            result = false;

        return result;
    } // MultiPoint#equals

    contains(that) {
        assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
        let result;

        if (isPoint(that))
            result = this.size > 0
                && this[$coords].every(coord => coord.equals(that));
        else if (isMultiPoint(that) || isGeometryCollection(that))
            result = this.size > 0 && that.size > 0
                && that[$coords].every(coord => this.contains(coord));
        else
            result = false;

        return result;
    } // MultiPoint#contains

    covers(that) {
        return this.contains(that);
    } // MultiPoint#covers

} // MultiPoint

module.exports = MultiPoint;