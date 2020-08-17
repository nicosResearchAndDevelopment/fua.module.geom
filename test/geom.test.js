const geom = require('../src/module.geom.js')({
    serializer: 'toJSON',
    deserializer: 'from',
    prefix: "geom"
});
const { Geometry, Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection } = geom;

describe("a Geometry should", () => {

    test("deserialize from GeoJSON", () => {
        expect(Geometry.from({
            "@type": "geom:LineString",
            "geom:coordinates": [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]
        })).toBeInstanceOf(geom.LineString);
    });

    test("serialize into the same argument from deserialization", () => {
        const serialization = {
            '@type': "geom:GeometryCollection",
            'geom:geometries': [{
                '@type': "geom:Point",
                'geom:coordinates': [1, 2]
            }, {
                '@type': "geom:MultiPoint",
                'geom:coordinates': [
                    [2, 3],
                    [4, 5]
                ]
            }, {
                '@type': "geom:MultiLineString",
                'geom:coordinates': [
                    [[1, 2], [2, 3]],
                    [[4, 5], [6, 7], [1, 2]]
                ]
            }, {
                '@type': "geom:Polygon",
                'geom:coordinates': [
                    [[1, 2], [8, 9], [2, 3], [1, 2]]
                ]
            }]
        };

        expect(Geometry.from(serialization).toJSON()).toMatchObject(serialization);
    });

});