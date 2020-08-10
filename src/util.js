module.exports = ({
    geom, conf, hrt
}) => {

    const util = {};

    util.$name = 'name';
    util.$species = Symbol.species;
    util.$iterator = Symbol.iterator;
    util.$name_tag = Symbol.toStringTag;
    util.$coords = Symbol('$coords');
    util.$coord_species = Symbol('$coord_species');
    util.$min_size = Symbol('$min_size');
    util.$max_size = Symbol('$max_size');
    util.$locked = Symbol('$locked');
    util.$serialize = 'toJSON';

    /**
     * @param {*} value 
     * @param {String} errMsg 
     * @param {Class<Error>} [errType=Error] 
     * @throws {Error<errType>} if value is falsy
     */
    util.assert = function (value, errMsg, errType = Error) {
        if (!value) {
            let err = new errType(`${conf.name} : ${errMsg}`);
            Error.captureStackTrace(err, util.assert);
            throw err;
        }
    };

    /**
     * @param {Object} obj 
     * @param {String} key 
     */
    util.lockAttr = function (obj, key) {
        Object.defineProperty(obj, key, {
            configurable: false,
            writable: false,
            enumerable: true
        });
    };

    /**
     * @param {Object} obj 
     * @param {String} key 
     */
    util.lockProp = function (obj, key) {
        Object.defineProperty(obj, key, {
            configurable: false,
            writable: false,
            enumerable: false
        });
    };

    /**
     * @param {Function|*} value 
     * @returns {true|false}
     */
    util.isFunction = function (value) {
        return typeof value === 'function';
    };

    /**
     * @template Proto
     * @typedef {Function<Proto>} Class
     * 
     * @param {Class<Vector>|*} value 
     * @returns {true|false|Class<Function>}
     */
    util.isClass = function (value) {
        return util.isFunction(value)
            && value.hasOwnProperty('prototype')
            && !value.hasOwnProperty('arguments');
    };

    /**
     * @param {Object|*} value 
     * @returns {true|false}
     */
    util.isObject = function (value) {
        return typeof value === 'object' && value !== null;
    };

    /**
     * @param {String|*} value
     * @returns {true|false}
     */
    util.isString = function (value) {
        return typeof value === 'string';
    };

    /**
     * @param {Symbol|*} value
     * @returns {true|false}
     */
    util.isSymbol = function (value) {
        return typeof value === 'symbol';
    };

    /**
     * @param {Boolean|*} value 
     * @returns {true|false}
     */
    util.isBoolean = function (value) {
        return typeof value === 'boolean';
    };

    /**
     * @param {Buffer|*} value 
     * @returns {true|false} 
     */
    util.isBuffer = function (value) {
        return value instanceof Buffer;
    };

    /**
     * @param {Array|*} value 
     * @returns {true|false}
     */
    util.isArray = function (value) {
        return Array.isArray(value);
    };

    /**
     * @param {TypedArray|*} value 
     * @returns {true|false} 
     */
    util.isTypedArray = function (value) {
        // TODO check and improve
        return ArrayBuffer.isView(value) && !(value instanceof DataView);
    };

    /**
     * @param {Number|*} value 
     * @returns {true|false} 
     */
    util.isNumber = function (value) {
        return typeof value === 'number'
            && !isNaN(value);
    };

    /**
     * @param {Array<Number>|*} value 
     * @returns {true|false}
     */
    util.isNumberArray = function (value) {
        return util.isArray(value)
            && value.every(util.isNumber);
    };

    /**
     * @typedef {Number} Int
     * @param {Int|*} value 
     * @returns {true|false} 
     */
    util.isInt = function (value) {
        // return typeof value === 'number'
        //     && value === parseInt(value);
        return Number.isInteger(value);
    };

    /**
     * @typedef {Array<Int>|Int32Array|Int16Array|Int8Array} IntArray
     * @param {IntArray|*} value 
     * @returns {true|false}
     */
    util.isIntArray = function (value) {
        return (util.isArray(value)
            && value.every(util.isInt))
            || (value instanceof Int32Array)
            || (value instanceof Int16Array)
            || (value instanceof Int8Array);
    };

    /**
     * @typedef {Int} Uint
     * @param {Uint|*} value 
     * @returns {true|false}
     */
    util.isUint = function (value) {
        return util.isInt(value)
            && value >= 0;
    };

    /**
     * @typedef {Array<Uint>|Uint32Array|Uint16Array|Uint8Array} UintArray
     * @param {UintArray|*} value 
     * @returns {true|false}
     */
    util.isUintArray = function (value) {
        return (util.isArray(value)
            && value.every(util.isUint))
            || (value instanceof Uint32Array)
            || (value instanceof Uint16Array)
            || (value instanceof Uint8Array);
    };

    /**
     * @typedef {Number} Float
     * @param {Float|*} value 
     * @returns {true|false}
     */
    util.isFloat = function (value) {
        return typeof value === 'number'
            && value === parseFloat(value);
    };

    /**
     * @typedef {Array<Float>|Float64Array|Float32Array} FloatArray
     * @param {FloatArray|*} value 
     * @returns {true|false}
     */
    util.isFloatArray = function (value) {
        return (util.isArray(value)
            && value.every(util.isFloat))
            || (value instanceof Float64Array)
            || (value instanceof Float32Array);
    };

    /**
     * @param {Geometry|*} value 
     * @returns {true|false}
     */
    util.isGeometry = function (value) {
        return value instanceof geom.Geometry;
    };

    /**
     * @param {GeometryCollection|*} value 
     * @returns {true|false}
     */
    util.isGeometryCollection = function (value) {
        return value instanceof geom.GeometryCollection;
    };

    /**
     * @param {Position|*} value 
     * @returns {true|false}
     */
    util.isPosition = function (value) {
        return value instanceof geom.Position;
    };

    /**
     * @param {Line|*} value 
     * @returns {true|false}
     */
    util.isLine = function (value) {
        return value instanceof geom.Line;
    };

    /**
     * @param {Point|*} value 
     * @returns {true|false}
     */
    util.isPoint = function (value) {
        return value instanceof geom.Point;
    };

    /**
     * @param {MultiPoint|*} value 
     * @returns {true|false}
     */
    util.isMultiPoint = function (value) {
        return value instanceof geom.MultiPoint;
    };

    /**
     * @param {LineString|*} value 
     * @returns {true|false}
     */
    util.isLineString = function (value) {
        return value instanceof geom.LineString;
    };

    /**
     * @param {MultiLineString|*} value 
     * @returns {true|false}
     */
    util.isMultiLineString = function (value) {
        return value instanceof geom.MultiLineString;
    };

    /**
     * @param {Polygon|*} value 
     * @returns {true|false}
     */
    util.isPolygon = function (value) {
        return value instanceof geom.Polygon;
    };

    /**
     * @param {MultiPolygon|*} value 
     * @returns {true|false}
     */
    util.isMultiPolygon = function (value) {
        return value instanceof geom.MultiPolygon;
    };

    return Object.freeze(util);

}; // module.exports