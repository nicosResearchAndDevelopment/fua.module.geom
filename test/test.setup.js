exports.geom = require('../src/module.geom.js')({
    'prefix': 'geom',
    'serializer': 'toJSON',
    'deserializer': 'from'
});

const { Point, LineString, Polygon } = exports.geom;

exports.pnt0 = Point.from([1.5, 1.5]);
exports.pnt1 = Point.from([4, 2]);
exports.pnt2 = Point.from([3, 3.5]);
exports.pnt3 = Point.from([2.5, 1.5]);
exports.pnt4 = Point.from([3.5, 2.5]);
exports.pnt5 = Point.from([2, 3]);
exports.pnt6 = Point.from([5, 2.5]);
exports.pnt7 = Point.from([.5, 1.5]);
exports.pnt8 = Point.from([3.75, 3.75]);

exports.lns0 = LineString.from([[1.5, .5], [1.5, 2], [3.5, 4], [5, 2.5]]);
exports.lns1 = LineString.from([[2.25, 2], [2.25, 4], [3.5, 3.75], [4.25, 3.75]]);
exports.lns2 = LineString.from([[2.5, 1.5], [3, 1], [4.75, 1], [4.75, 3.75]]);
exports.lns3 = LineString.from([[4.5, .5], [4, 1], [2.5, 1], [2.5, 0]]);

exports.poly0 = Polygon.from([
    [[1, 1], [2, 1], [3, 2], [3.5, 1.5], [4.5, 1.5], [4.5, 3], [5.5, 3], [3, 5.5], [3, 4.5], [1.5, 4.5], [1.5, 3.5], [2, 3], [1, 2], [1, 1]],
    [[2.5, 2.5], [2.5, 3.5], [3.5, 2.5], [2.5, 2.5]],
    [[4, 4], [4, 3], [3, 4], [4, 4]]
]);

Object.freeze(exports);