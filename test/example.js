const Point = require('../src/geometries/Point.js');

const geom = require('../src/module.geom.js')();
console.log(geom);
const point = new geom.Point(1, 2);
console.log(point);
const multi_point = new geom.MultiPoint(point, new geom.Point(3, 4));
console.log(JSON.stringify(multi_point, null, 2));
debugger;