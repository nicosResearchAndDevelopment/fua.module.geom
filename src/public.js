module.exports = ({
    geom: {
        Geometry,
        Point, MultiPoint,
        LineString, MultiLineString,
        Polygon, MultiPolygon,
        GeometryCollection
    }
}) => {

    return Object.create({}, {
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
            value: (left, right) => left.equals(right),
            enumerable: true
        },
        'disjoint': {
            value: (left, right) => left.disjoint(right),
            enumerable: true
        },
        'intersects': {
            value: (left, right) => left.intersects(right),
            enumerable: true
        },
        'touches': {
            value: (left, right) => left.touches(right),
            enumerable: true
        },
        'meets': {
            value: (left, right) => left.meets(right),
            enumerable: true
        },
        'contains': {
            value: (left, right) => left.contains(right),
            enumerable: true
        },
        'overlaps': {
            value: (left, right) => left.overlaps(right),
            enumerable: true
        },
        'covers': {
            value: (left, right) => left.covers(right),
            enumerable: true
        },
        'coveredBy': {
            value: (left, right) => left.coveredBy(right),
            enumerable: true
        },
        'inside': {
            value: (left, right) => left.inside(right),
            enumerable: true
        },
        'within': {
            value: (left, right) => left.within(right),
            enumerable: true
        },
        'crosses': {
            value: (left, right) => left.crosses(right),
            enumerable: true
        }
    });

}; // module.exports