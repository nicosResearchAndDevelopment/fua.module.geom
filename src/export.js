module.exports = ({
    conf, geom: {
        Geometry,
        Point, MultiPoint,
        LineString, MultiLineString,
        Polygon, MultiPolygon,
        GeometryCollection
    }, util: {
        assert, isGeometry, isObject, $serialize, $deserialize
    }
}) => {

    return Object.create({}, {
        // '@id': {
        //     value: conf.name,
        //     enumerable: true
        // },
        '$serialize': {
            value: (geometry) => {
                assert(isGeometry(geometry), `geom:$serialize : invalid @param {Geometry} geometry`, TypeError);
                return geometry[$serialize]();
            },
            enumerable: true
        },
        '$deserialize': {
            value: (json) => {
                assert(isObject(json), `geom:$deserialize : invalid @param {Object} json`, TypeError);
                return Geometry[$deserialize](json);
            },
            enumerable: true
        },
        'Geometry': {
            value: Geometry,
            enumerable: true
        },
        'Point': {
            value: Point,
            enumerable: true
        },
        'MultiPoint': {
            value: MultiPoint,
            enumerable: true
        },
        'LineString': {
            value: LineString,
            enumerable: true
        },
        'MultiLineString': {
            value: MultiLineString,
            enumerable: true
        },
        'Polygon': {
            value: Polygon,
            enumerable: true
        },
        'MultiPolygon': {
            value: MultiPolygon,
            enumerable: true
        },
        'GeometryCollection': {
            value: GeometryCollection,
            enumerable: true
        },
        'equals': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:equals : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:equals : invalid @param {Geometry} right`, TypeError);
                left.equals(right);
            },
            enumerable: true
        },
        'disjoint': {
            value: (left, right) => (left, right) => {
                assert(isGeometry(left), `geom:disjoint : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:disjoint : invalid @param {Geometry} right`, TypeError);
                left.disjoint(right);
            },
            enumerable: true
        },
        'intersects': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:intersects : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:intersects : invalid @param {Geometry} right`, TypeError);
                left.intersects(right);
            },
            enumerable: true
        },
        'touches': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:touches : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:touches : invalid @param {Geometry} right`, TypeError);
                left.touches(right);
            },
            enumerable: true
        },
        'meets': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:meets : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:meets : invalid @param {Geometry} right`, TypeError);
                left.meets(right);
            },
            enumerable: true
        },
        'contains': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:contains : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:contains : invalid @param {Geometry} right`, TypeError);
                left.contains(right);
            },
            enumerable: true
        },
        'overlaps': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:overlaps : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:overlaps : invalid @param {Geometry} right`, TypeError);
                left.overlaps(right);
            },
            enumerable: true
        },
        'covers': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:covers : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:covers : invalid @param {Geometry} right`, TypeError);
                left.covers(right);
            },
            enumerable: true
        },
        'coveredBy': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:coveredBy : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:coveredBy : invalid @param {Geometry} right`, TypeError);
                left.coveredBy(right);
            },
            enumerable: true
        },
        'inside': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:inside : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:inside : invalid @param {Geometry} right`, TypeError);
                left.inside(right);
            },
            enumerable: true
        },
        'within': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:within : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:within : invalid @param {Geometry} right`, TypeError);
                left.within(right);
            },
            enumerable: true
        },
        'crosses': {
            value: (left, right) => {
                assert(isGeometry(left), `geom:crosses : invalid @param {Geometry} left`, TypeError);
                assert(isGeometry(right), `geom:crosses : invalid @param {Geometry} right`, TypeError);
                left.crosses(right);
            },
            enumerable: true
        }
    });

}; // module.exports