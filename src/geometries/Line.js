const
    {
        PREFIX, REFERENCE_SYSTEM,
        $name, $name_tag, $species, $coord_species, $unique_coords, $min_size, $max_size, $coords,
        assert, lockProp
    }          = require('../module.geom.util.js'),
    algo       = require('../algorithms'),
    geom       = require('../geometries'),
    isGeometry = (value) => value instanceof geom.Geometry,
    isPoint    = (value) => value instanceof geom.Point,
    isLine     = (value) => value instanceof geom.Line;

class Line extends geom.Geometry {

    static get [$name]() {
        return 'Line';
    }

    static get [$species]() {
        return Line;
    }

    static get [$coord_species]() {
        return geom.Point;
    }

    static get [$unique_coords]() {
        return true;
    }

    static get [$min_size]() {
        return 2;
    }

    static get [$max_size]() {
        return 2;
    }

    /** @type {Point} */
    get from() {
        return this[$coords][0];
    }

    /** @type {Point} */
    get to() {
        return this[$coords][1];
    }

    equals(that) {
        assert(isGeometry(that), `${this[$name_tag]}#equals : invalid @param {Geometry} that`);
        let result;

        if (this === that)
            result = true;
        else if (isPoint(that))
            result = false;
        else if (isLine(that))
            result = algo.equals.Line_Line(this, that);
        else
            result = super.equals(that);

        return result;
    } // Line#equals

    contains(that) {
        assert(isGeometry(that), `${this[$name_tag]}#contains : invalid @param {Geometry} that`);
        let result;

        if (isPoint(that))
            result = algo.contains.Line_Point(this, that);
        else if (isLine(that))
            result = algo.contains.Line_Point(this, that.from) && algo.contains.Line_Point(this, that.to);
        else
            result = super.contains(that);

        return result;
    } // Line#contains

    covers(that) {
        assert(isGeometry(that), `${this[$name_tag]}#covers : invalid @param {Geometry} that`);
        let result;

        if (isPoint(that))
            result = algo.covers.Line_Point(this, that);
        else if (isLine(that))
            result = algo.covers.Line_Point(this, that.from) && algo.covers.Line_Point(this, that.to);
        else
            result = super.covers(that);

        return result;
    } // Line#covers

    intersects(that) {
        assert(isGeometry(that), `${this[$name_tag]}#intersects : invalid @param {Geometry} that`);
        let result;

        if (isPoint(that))
            result = algo.covers.Line_Point(this, that);
        else if (isLine(that))
            result = algo.intersects.Line_Line(this, that);
        else
            result = super.intersects(that);

        return result;
    } // Line#intersects

    overlaps(that) {
        assert(isGeometry(that), `${this[$name_tag]}#overlaps : invalid @param {Geometry} that`);
        let result;

        if (isPoint(that))
            result = false;
        else if (isLine(that))
            result = algo.overlaps.Line_Line(this, that);
        else
            result = super.overlaps(that);

        return result;
    } // Line#overlaps

} // Line

module.exports = Line;