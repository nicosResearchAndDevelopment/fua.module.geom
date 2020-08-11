const geom = require('../src/module.geom.js')({
    serializer: 'toJSON',
    deserializer: 'from'
});
const { Geometry, Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection } = geom;

describe("a Geometry should", () => {

    test("deserialize from GeoJSON", () => {
        expect(Geometry.from({
            type: "LineString",
            coordinates: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]
        })).toBeInstanceOf(geom.LineString);
    });

    test("serialize into the same argument from deserialization", () => {
        const serialization = {
            type: "GeometryCollection",
            geometries: [{
                type: "Point",
                coordinates: [1, 2]
            }, {
                type: "MultiPoint",
                coordinates: [
                    [2, 3],
                    [4, 5]
                ]
            }, {
                type: "MultiLineString",
                coordinates: [
                    [[1, 2], [2, 3]],
                    [[4, 5], [6, 7], [1, 2]]
                ]
            }, {
                type: "Polygon",
                coordinates: [
                    [[1, 2], [8, 9], [2, 3], [1, 2]]
                ]
            }]
        };

        expect(Geometry.from(serialization).toJSON()).toMatchObject(serialization);
    });

});