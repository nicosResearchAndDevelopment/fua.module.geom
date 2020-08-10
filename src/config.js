module.exports = ({
    'name': name = 'module.geom',
    'tolerance': tolerance = Number.EPSILON
}) => {

    const conf = {
        name,
        tolerance
    };

    return Object.freeze(conf);

}; // module.exports