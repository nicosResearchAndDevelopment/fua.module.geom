const
    {
        PREFIX, assert, isObject, $serialize, $deserialize
    }          = require('./module.geom.util.js'),
    {
        Geometry,
        Point, MultiPoint,
        LineString, MultiLineString,
        Polygon, MultiPolygon,
        GeometryCollection
    }          = require('./geometries/index.js'),
    isGeometry = (value) => value instanceof Geometry;

exports.$serialize = function (geometry) {
    assert(isGeometry(geometry), `${PREFIX}:$serialize : invalid @param {Geometry} geometry`, TypeError);
    return geometry[$serialize]();
};

exports.$deserialize = function (json) {
    assert(isObject(json), `${PREFIX}:$deserialize : invalid @param {Object} json`, TypeError);
    return Geometry[$deserialize](json);
};

exports.Geometry           = Geometry;
exports.Point              = Point;
exports.MultiPoint         = MultiPoint;
exports.LineString         = LineString;
exports.MultiLineString    = MultiLineString;
exports.Polygon            = Polygon;
exports.MultiPolygon       = MultiPolygon;
exports.GeometryCollection = GeometryCollection;

exports.equals = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:equals : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:equals : invalid @param {Geometry} right`, TypeError);
    left.equals(right);
};

exports.disjoint = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:disjoint : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:disjoint : invalid @param {Geometry} right`, TypeError);
    left.disjoint(right);
};

exports.intersects = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:intersects : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:intersects : invalid @param {Geometry} right`, TypeError);
    left.intersects(right);
};

exports.touches = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:touches : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:touches : invalid @param {Geometry} right`, TypeError);
    left.touches(right);
};

exports.meets = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:meets : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:meets : invalid @param {Geometry} right`, TypeError);
    left.meets(right);
};

exports.contains = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:contains : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:contains : invalid @param {Geometry} right`, TypeError);
    left.contains(right);
};

exports.overlaps = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:overlaps : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:overlaps : invalid @param {Geometry} right`, TypeError);
    left.overlaps(right);
};

exports.covers = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:covers : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:covers : invalid @param {Geometry} right`, TypeError);
    left.covers(right);
};

exports.coveredBy = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:coveredBy : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:coveredBy : invalid @param {Geometry} right`, TypeError);
    left.coveredBy(right);
};

exports.inside = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:inside : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:inside : invalid @param {Geometry} right`, TypeError);
    left.inside(right);
};

exports.within = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:within : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:within : invalid @param {Geometry} right`, TypeError);
    left.within(right);
};

exports.crosses = function (left, right) {
    assert(isGeometry(left), `${PREFIX}:crosses : invalid @param {Geometry} left`, TypeError);
    assert(isGeometry(right), `${PREFIX}:crosses : invalid @param {Geometry} right`, TypeError);
    left.crosses(right);
};

Object.freeze(exports);