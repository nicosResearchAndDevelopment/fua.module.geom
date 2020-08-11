module.exports = ({
    'name': name = 'module.geom',
    'tolerance': tolerance = Number.EPSILON,
    'serializer': serializer = 'toJSON',
    'deserializer': deserializer = 'from'
}) => {

    const conf = {
        name,
        tolerance,
        serializer,
        deserializer
    };

    return Object.freeze(conf);

}; // module.exports