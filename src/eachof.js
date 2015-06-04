/*(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], function (exports) {
            factory((root.commonJsStrictGlobal = exports));
        });
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory((root.commonJsStrictGlobal = {}));
    }
}(this, function (exports) {
*/
var log = console.log.bind(console);

    function isArrayLike(object) {
        switch(object ? object.constructor : 0) {
            case Array:
            case Int8Array:
            case Uint8Array:
            case Uint8ClampedArray:
            case Int16Array:
            case Uint16Array:
            case Int32Array:
            case Uint32Array:
            case Float32Array:
            case Float64Array:
                return true;
            default:
                return Object.prototype.toString.call(object) === '[object Arguments]';
        }
    }
    function isPlainObject(object) {
        return object && object.constructor === Object ? true : false;
    }

    function eachof(collection, condition) {
        var index,
            length;

        if (isArrayLike(collection)) {
            index = collection.length;

            if (index === 0) {
                return false;
            }

            while (index--) {
                if (collection[index] !== condition) {
                    return false;
                }
            }

        } else if (isPlainObject(collection)) {
            length = 0;

            for (var element in collection) {
                if (collection.hasOwnProperty(element)) {
                    if (collection.element !== condition) {
                        return false;
                    }
                    ++length;
                }
            }

            if (length === 0) {
                return false;
            }
        }

        return true;
    }

    module.exports = eachof;

/*
    //exports = eachof;
    return eachof;
}));
*/
