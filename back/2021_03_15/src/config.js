module.exports = ({
    'name': name = 'module.geom',
    'prefix': prefix = 'geom',
    'tolerance': tolerance = Number.EPSILON,
    'serializer': serializer = 'toJSON',
    'deserializer': deserializer = 'from',
    'reference': reference = 'http://dbpedia.org/page/Geographic_coordinate_system'
}) => {

    const conf = {
        name,
        prefix,
        tolerance,
        serializer,
        deserializer,
        reference
    };

    return Object.freeze(conf);

}; // module.exports