const Point = require('../src/geometries/Point.js');

const geom = require('../src/module.geom.js')();
console.log("geom:", geom);
const point = new geom.Point(1, 3);
console.log("point:", point);
const multi_point = new geom.MultiPoint(point, new geom.Point(2, 4));
multi_point.add(new geom.Point(-1, 2));
console.log("multi_point.json:", JSON.stringify(multi_point, null, 2));
multi_point.lock();
console.log("multi_point.bbox:", multi_point.bbox().coordinates());
console.log("line:", point.lineTo(new geom.Point(2, 4)));
debugger;