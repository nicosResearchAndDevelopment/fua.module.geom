/**
 * @param {Position|*} value 
 * @returns {true|false}
 */
exports.isPosition = function isPosition(value) {
    return value instanceof exports.Position;
};

/**
 * @param {Line|*} value 
 * @returns {true|false}
 */
exports.isLine = function isLine(value) {
    return value instanceof exports.Line;
};

/**
 * @param {Geometry|*} value 
 * @returns {true|false}
 */
exports.isGeometry = function isGeometry(value) {
    return value instanceof exports.Geometry;
};

/**
 * @param {String|*} value
 * @returns {true|false}
 */
exports.isGeometryType = function isGeometryType(value) {
    return [
        "Point", "MultiPoint",
        "LineString", "MultiLineString",
        "Polygon", "MultiPolygon",
        "GeometryCollection"
    ].includes(value);
};

/**
 * @param {Point|*} value 
 * @returns {true|false}
 */
exports.isPoint = function isPoint(value) {
    return value instanceof exports.Point;
};

/**
 * @param {MultiPoint|*} value 
 * @returns {true|false}
 */
exports.isMultiPoint = function isMultiPoint(value) {
    return value instanceof exports.MultiPoint;
};

/**
 * @param {LineString|*} value 
 * @returns {true|false}
 */
exports.isLineString = function isLineString(value) {
    return value instanceof exports.LineString;
};

/**
 * @param {MultiLineString|*} value 
 * @returns {true|false}
 */
exports.isMultiLineString = function isMultiLineString(value) {
    return value instanceof exports.MultiLineString;
};

/**
 * @param {Polygon|*} value 
 * @returns {true|false}
 */
exports.isPolygon = function isPolygon(value) {
    return value instanceof exports.Polygon;
};

/**
 * @param {MultiPolygon|*} value 
 * @returns {true|false}
 */
exports.isMultiPolygon = function isMultiPolygon(value) {
    return value instanceof exports.MultiPolygon;
};

/**
 * @param {GeometryCollection|*} value 
 * @returns {true|false}
 */
exports.isGeometryCollection = function isGeometryCollection(value) {
    return value instanceof exports.GeometryCollection;
};

exports.Line = require("./Geometries/Line.js");
exports.Position = require("./Geometries/Position.js");
// exports.Geometry = require("./Geometry.js");
// exports.Point = require("./Point.js");
// exports.MultiPoint = require("./MultiPoint.js");
// exports.LineString = require("./LineString.js");
// exports.MultiLineString = require("./MultiLineString.js");
// exports.LinearRing = require("./LinearRing.js");
// exports.Polygon = require("./Polygon.js");
// exports.MultiPolygon = require("./MultiPolygon.js");
// exports.GeometryCollection = require("./GeometryCollection.js");

Object.freeze(exports);