const
    initConfig = require('./config.js'),
    initExport = require('./export.js'),
    initUtility = require('./utility.js'),
    initEquals = require('./algorithms/equals.js'),
    initPreprocess = require('./algorithms/preprocess.js'),
    initIntersects = require('./algorithms/intersects.js'),
    initTouches = require('./algorithms/touches.js'),
    initContains = require('./algorithms/contains.js'),
    initOverlaps = require('./algorithms/overlaps.js'),
    initCovers = require('./algorithms/covers.js'),
    initCrosses = require('./algorithms/crosses.js'),
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
        geom = {}, algo = {},
        conf = initConfig(config),
        util = initUtility({ geom, conf, hrt }),
        param = Object.freeze({ geom, algo, conf, util });

    algo.preprocess = initPreprocess(param);
    algo.equals = initEquals(param);
    algo.intersects = initIntersects(param);
    algo.touches = initTouches(param);
    algo.contains = initContains(param);
    algo.overlaps = initOverlaps(param);
    algo.covers = initCovers(param);
    algo.crosses = initCrosses(param);
    Object.freeze(algo);

    geom.Geometry = initGeometry(param);
    geom.Point = initPoint(param);
    geom.BBox = initBBox(param);
    geom.MultiPoint = initMultiPoint(param);
    geom.Line = initLine(param);
    geom.LineString = initLineString(param);
    geom.MultiLineString = initMultiLineString(param);
    geom.LinearRing = initLinearRing(param);
    geom.Polygon = initPolygon(param);
    geom.MultiPolygon = initMultiPolygon(param);
    geom.GeometryCollection = initGeometryCollection(param);
    Object.freeze(geom);

    return initExport(param);

}; // module.exports

