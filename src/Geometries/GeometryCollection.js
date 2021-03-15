const
    {
        PREFIX, REFERENCE_SYSTEM,
        $name, $name_tag, $species, $coord_species, $unique_coords, $coords,
        assert, lockProp

    }    = require('../module.geom.util.js'),
    algo = require('../algorithms'),
    geom = require('../geometries');

class GeometryCollection extends geom.Geometry {

    static get [$name]() {
        return 'GeometryCollection';
    }

    static get [$species]() {
        return GeometryCollection;
    }

    static get [$coord_species]() {
        return geom.Geometry;
    }

    static get [$unique_coords]() {
        return true;
    }

} // GeometryCollection

module.exports = GeometryCollection;