const {
    geom: { Geometry, Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, GeometryCollection },
    pnt0, pnt1, pnt2, pnt3, pnt4, pnt5, pnt6, pnt7, pnt8,
    lns0, lns1, lns2,
    poly0
} = require('./test.setup.js');

describe("a Geometry should", () => {

    test("deserialize from GeoJSON", () => {
        expect(Geometry.from({
            "@type": "geom:LineString",
            "geom:coordinates": [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]
        })).toBeInstanceOf(LineString);
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