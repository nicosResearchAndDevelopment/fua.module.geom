module.exports = ({
    geom, algo, util: {
        $species, $iterator, $name, $name_tag, $children, $child_species, $min_childs, $max_childs,
        assert, lockProp, isObject, isArray, isNumber, isFloat, isGeometry, isPosition
    }
}) => {

    class Geometry {

        static get [$name]() { return "Geometry"; }
        static get [$species]() { return Geometry; }
        static get [$child_species]() { return Geometry; }
        static get [$min_childs]() { return 0; }
        static get [$max_childs]() { return Number.MAX_SAFE_INTEGER; }

        /**
         * @typedef {Class<Geometry|Number>} ChildSpecies
         * 
         * @abstract
         * @param {...ChildSpecies} children
         */
        constructor(...children) {

            const {
                [$species]: species,
                [$child_species]: child_species,
                [$min_childs]: min_childs,
                [$max_childs]: max_childs
            } = new.target, {
                [$name_tag]: name_tag
            } = this;

            assert(species !== Geometry,
                `${name_tag}#constructor : is @abstract`);
            assert(children.length >= min_childs,
                `${name_tag}#constructor : expected at least ${min_childs} arguments`);
            assert(children.length <= max_childs,
                `${name_tag}#constructor : expected at maximum ${max_childs} arguments`);
            if (child_species === Number) assert(children.every(isFloat),
                `${name_tag}#constructor : invalid @param {...Number} args`);
            else assert(children.every(val => val instanceof child_species),
                `${name_tag}#constructor : invalid @param {...${child_species.name}} args`);

            /** @type {Array<ChildSpecies>} */
            this[$children] = children;
            lockProp(this, $children);

        } // Geometry#constructor

        get [$name_tag]() { return this.__proto__.constructor.name; }
        get [$iterator]() { return this[$children][$iterator]; }

        // TODO
        // lock() {
        //     if (this[$child_species] !== Number) {
        //         Object.freeze(this[$children]);
        //         for (let child of this[$children]) {
        //             child.lock();
        //         }
        //     }
        // } // Geometry#lock

        // /**
        //  * @returns {JSON}
        //  */
        // toJSON() {
        //     const result = { "type": this[$name_tag] };

        //     if (this[$child_species] === Geometry)
        //         result["geometries"] = this[$children].map(child => child.toJSON());
        //     else if (this[$child_species] === Number)
        //         result["coordinates"] = this[$children].toJSON();
        //     else
        //         result["coordinates"] = (function collect(geom) {
        //             if (geom[$child_species] === Number)
        //                 return geom[$children].toJSON();
        //             else
        //                 return geom[$children].map(collect);
        //         })(this);

        //     return result;
        // } // Geometry#toJSON

        // static from(arg) {
        //     /** @type {Class<Geometry>} */
        //     const targetType = this[Symbol.species];
        //     if (targetType === Geometry) {
        //         assert(isObject(arg), `Geometry.from : invalid @param {Object} arg`);
        //         switch (arg["type"]) {
        //             case "Point": return geom.Point.from(arg["coordinates"]);
        //             case "MultiPoint": return geom.MultiPoint.from(arg["coordinates"]);
        //             case "LineString": return geom.LineString.from(arg["coordinates"]);
        //             case "MultiLineString": return geom.MultiLineString.from(arg["coordinates"]);
        //             case "Polygon": return geom.Polygon.from(arg["coordinates"]);
        //             case "MultiPolygon": return geom.MultiPolygon.from(arg["coordinates"]);
        //             case "GeometryCollection": return geom.GeometryCollection.from(arg["geometries"]);
        //             default: assert(false, `Geometry.from : unknown type ${arg["type"]}`);
        //         }
        //     } else if (Geometry.isPrototypeOf(targetType)) {
        //         const child_species = targetType[$child_species];
        //         if (child_species === Number) {
        //             assert(isArray(arg) || isPosition(arg) || isFloatArray(arg),
        //                 `Geometry.from : invalid @param {Array|FloatArray} arg`);
        //             return new targetType(...arg);
        //         } else {
        //             assert(isArray(arg),
        //                 `Geometry.from : invalid @param {Array} arg`);
        //             return new targetType(...(arg.map(child_species.from.bind(child_species))));
        //         }
        //     }
        // } // Geometry.from

        /**
         * Two sets A and B are equal, if for every point a in A and every point b in B, also a is in B and b is in A.
         * - symmetric
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        equals(that) {
            assert(false, `${this[$name_tag]}#equals : @interface not implemented`);
        } // Geometry#equals

        /**
         * A set A contains a set B, if for every point b in B, also b is in A.
         * If two sets contain each other, they must be equal.
         * - not symmetric
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        contains(that) {
            assert(false, `${this[$name_tag]}#contains : @interface not implemented`);
        } // Geometry#contains

        /**
         * A set A intersects a set B, if there exists a point p, such that p is in A and also in B.
         * - symmetric
         * - opposite of disjoint
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        intersects(that) {
            assert(false, `${this[$name_tag]}#intersects : @interface not implemented`);
        } // Geometry#intersects

        /**
         * A set A overlaps a set B, if A intersects B, but A does not just touch B.
         * Also the intersection shall have at least the dimensionality of the minimum dimensionality of the two sets.
         * - symmetric
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        overlaps(that) {
            assert(false, `${this[$name_tag]}#overlaps : @interface not implemented`);
        } // Geometry#overlaps

        /**
         * Two sets are touching, if they intersect and their intersection only includes their boundaries. 
         * Also the tangent vectors of both sets at the point(s) of intersection should point in the same direction. 
         * Also the intersection shall have at least 1 times less dimensionality than the maximum dimensionality of the two sets.
         * - symmetric
         * @interface 
         * @param {Geometry} that 
         * @returns {boolean}
         */
        touches(that) {
            assert(false, `${this[$name_tag]}#touches : @interface not implemented`);
        } // Geometry#touches

        /**
         * A set A is disjoint with a set B, if there exists no point p, such that p is in A and also in B.
         * - symmetric
         * - opposite of intersects
         * @param {Geometry} that 
         * @returns {boolean}
         */
        disjoint(that) {
            return !this.intersects(that);
        } // Geometry#disjoint

    } // Geometry

    return Geometry;

}; // module.exports