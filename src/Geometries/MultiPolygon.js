const
    {
        PREFIX, REFERENCE_SYSTEM,
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp, isBoolean
    }    = require('../module.geom.util.js'),
    algo = require('../algorithms'),
    geom = require('../geometries');

class MultiPolygon extends geom.Geometry {

    static get [$name]() {
        return 'MultiPolygon';
    }

    static get [$species]() {
        return MultiPolygon;
    }

    static get [$coord_species]() {
        return geom.Polygon;
    }

    static get [$unique_coords]() {
        return true;
    }

} // MultiPolygon

module.exports = MultiPolygon;