const
    initConfig = require('./config.js'),
    initPublic = require('./public.js'),
    initUtility = require('./util.js'),
    initAlgorithms = require('./algorithms.js'),
    // initEquals = require('./algorithms/equals.js'),
    // initIntersects = require('./algorithms/intersects.js'),
    // initTouches = require('./algorithms/touches.js'),
    // initContains = require('./algorithms/contains.js'),
    // initOverlaps = require('./algorithms/overlaps.js'),
    // initCovers = require('./algorithms/covers.js'),
    // initCrosses = require('./algorithms/crosses.js'),
    initGeometry = require('./geometries/Geometry.js'),
    initPoint = require('./geometries/Point.js'),
    initBBox = require('./geometries/BBox.js'),
    initMultiPoint = require('./geometries/MultiPoint.js'),
    initLine = require('./geometries/Line.js'),
    initLineString = require('./geometries/LineString.js'),
    initMultiLineString = require('./geometries/MultiLineString.js'),
    initLinearRing = require('./geometries/LinearRing.js'),
    initPolygon = require('./geometries/Polygon.js'),
    initMultiPolygon = require('./geometries/MultiPolygon.js'),
    initGeometryCollection = require('./geometries/GeometryCollection.js');

module.exports = ({
    'hrt': hrt = () => 1e-3 * Date.now(),
    'config': config = {}
} = {}) => {

    const
        geom = {}, // algo = {},
        conf = initConfig(config),
        util = initUtility({ geom, conf, hrt }),
        algo = initAlgorithms({ geom, conf, util });

    // algo.equals = initEquals({ algo, util });

    geom.Geometry = initGeometry({ geom, conf, util });
    geom.Point = initPoint({ geom, algo, util });
    geom.BBox = initBBox({ geom, algo, util });
    geom.MultiPoint = initMultiPoint({ geom, algo, util });
    geom.Line = initLine({ geom, algo, util });
    geom.LineString = initLineString({ geom, algo, util });
    geom.MultiLineString = initMultiLineString({ geom, algo, util });
    geom.LinearRing = initLinearRing({ geom, algo, util });
    geom.Polygon = initPolygon({ geom, algo, util });
    geom.MultiPolygon = initMultiPolygon({ geom, algo, util });
    geom.GeometryCollection = initGeometryCollection({ geom, algo, util });

    return initPublic({ geom });

}; // module.exports

