const
    _           = exports,
    util        = require('@nrd/fua.core.util'),
    MODULE_NAME = 'module.geom';

_.PREFIX           = 'geom';
_.REFERENCE_SYSTEM = 'http://dbpedia.org/page/Geographic_coordinate_system';
_.TOLERANCE        = Number.EPSILON;

_.$name     = 'name';
_.$species  = Symbol.species;
_.$iterator = Symbol.iterator;
_.$name_tag = Symbol.toStringTag;

_.$coords        = Symbol('$coords');
_.$coord_species = Symbol('$coord_species');
_.$unique_coords = Symbol('$unique_coords');
_.$min_size      = Symbol('$min_size');
_.$max_size      = Symbol('$max_size');

_.$locked      = Symbol('$locked');
_.$bbox        = Symbol('$bbox');
_.$serialize   = 'toJSON';
_.$deserialize = 'from';

_.assert   = new util.Assert(MODULE_NAME);
_.lockProp = function (obj, ...keys) {
    util.hideProp(obj, ...keys);
    util.lockProp(obj, ...keys);
};

_.isObject = util.isObject;
_.isArray  = util.isArray;

_.isNumber      = util.isNumber;
_.isNumberArray = util.ArrayValidator(_.isNumber);
_.isInt         = util.isInteger;
_.isIntArray    = function (value) {
    return (_.isArray(value) && value.every(_.isInt))
        || (value instanceof Int32Array)
        || (value instanceof Int16Array)
        || (value instanceof Int8Array);
};
_.isUint        = function (value) {
    return _.isInt(value) && value >= 0;
};
_.isUintArray   = function (value) {
    return (_.isArray(value) && value.every(_.isUint))
        || (value instanceof Uint32Array)
        || (value instanceof Uint16Array)
        || (value instanceof Uint8Array);
};
_.isFloat       = _.isNumber;
_.isFloatArray  = function (value) {
    return (_.isArray(value) && value.every(_.isFloat))
        || (value instanceof Float64Array)
        || (value instanceof Float32Array);
};

Object.freeze(_);