const
    {
        PREFIX, REFERENCE_SYSTEM,
        $name, $name_tag, $species, $coord_species, $min_size, $coords,
        assert, lockProp
    }                    = require('../module.geom.util.js'),
    algo                 = require('../algorithms'),
    geom                 = require('../geometries'),
    isGeometry           = (value) => value instanceof geom.Geometry,
    isPoint              = (value) => value instanceof geom.Point,
    isPolygon            = (value) => value instanceof geom.Polygon,
    isMultiPolygon       = (value) => value instanceof geom.MultiPolygon,
    isGeometryCollection = (value) => value instanceof geom.GeometryCollection;

class Polygon extends geom.Geometry {

    static get [$name]() {
        return 'Polygon';
    }

    static get [$species]() {
        return Polygon;
    }

    static get [$coord_species]() {
        return geom.LinearRing;
    }

    static get [$min_size]() {
        return 1;
    }

    equals(that) {
        assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
        let result;

        if (this === that)
            result = true;
        if (isPolygon(that))
            result = algo.equals.Polygon_Polygon(this, that);
        else if (isMultiPolygon(that) || isGeometryCollection(that))
            result = that.equals(this);
        else
            result = false;

        return result;
    } // Polygon#equals

    contains(that) {
        assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
        let result;

        if (isPoint(that))
            result = algo.contains.Polygon_Point(this, that);
        else
            super.contains(that);

        return result;
    } // Polygon#contains

    covers(that) {
        assert(isGeometry(that), `${this[$name_tag]}#covers : invalid @param {Geometry} that`);
        let result;

        if (isPoint(that))
            result = algo.covers.Polygon_Point(this, that);
        else
            super.covers(that);

        return result;
    } // Polygon#covers

} // Polygon

module.exports = Polygon;