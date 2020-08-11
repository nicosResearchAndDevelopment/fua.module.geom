const
    initConfig = require('./config.js'),
    initUtility = require('./util.js'),
    initAlgorithms = require('./algorithms.js'),
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
        conf = initConfig(config),
        geom = {},
        util = initUtility({ geom, conf, hrt }),
        algo = initAlgorithms({ geom, conf, util }),
        param = { geom, algo, util };

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

    return Object.create({}, {
        'Geometry': {
            value: geom.Geometry,
            enumerable: true
        },
        'Point': {
            value: geom.Point,
            enumerable: true
        },
        'MultiPoint': {
            value: geom.MultiPoint,
            enumerable: true
        },
        'LineString': {
            value: geom.LineString,
            enumerable: true
        },
        'MultiLineString': {
            value: geom.MultiLineString,
            enumerable: true
        },
        'Polygon': {
            value: geom.Polygon,
            enumerable: true
        },
        'MultiPolygon': {
            value: geom.MultiPolygon,
            enumerable: true
        },
        'GeometryCollection': {
            value: geom.GeometryCollection,
            enumerable: true
        }
    });

}; // module.exports

