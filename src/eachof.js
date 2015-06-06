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

// TODO: IE8 compatibility
// TODO: strict vs regular equality
// TODO: multiple conditions / array condition / object condition / array-like condition
// TODO: UMD
/* TODO: NaN check:
    - when it is in a collection,
    - also when it is the condition
*/

var log = console.log.bind(console);

    function eachof(collection, condition) {
        var matches = false,
            length = 0;

        // When no condition was given or called without parameters, return false
        if (arguments.length < 2) {
            return false;
        }

        var collectionIsNaN = collection !== collection,
            conditionIsNaN  = condition !== condition;

        // When the collection is NaN, but the condition isn't, then return false
        if (collectionIsNaN && !collectionIsNaN) {
            return false;
        }

        // When the collection and the condition are both NaNs, as they are certainly equal, return true
        if (collectionIsNaN && conditionIsNaN) {
            return true;
        }

        // If it is a collection
        if (collection && typeof collection === 'object') {
            var isArrayLike;

            if (collection.constructor === Array) {
                isArrayLike = true;
                //log('isArrayLike');

            } else if (collection.constructor === Object) {
                matches = true;

                for (var element in collection) {
                    if (collection.hasOwnProperty(element)) {
                        element = collection[element];

                        // Check, whether the element is NOT NaN, as if the element is equal to itself, it is not NaN
                        if (element === element) {
                            if (!conditionIsNaN) {
                                if (element !== condition) {
                                    matches = false;
                                    break;
                                }
                            } else {
                                matches = false;
                                break;
                            }

                        // If the element is NaN
                        } else {
                            if (!conditionIsNaN) {
                                matches = false;
                                break;

                            // If the element and the condition are both NaNs, they are equal
                            } else {
                                matches = true;
                            }
                        }

                        ++length;
                    }
                }

                if (length === 0) {
                    matches = false;
                }

                return matches;

            } else {
                switch(collection.constructor) {
                    case Int8Array:
                    case Uint8Array:
                    case Uint8ClampedArray:
                    case Int16Array:
                    case Uint16Array:
                    case Int32Array:
                    case Uint32Array:
                    case Float32Array:
                    case Float64Array:
                        isArrayLike = true;
                    default:
                        isArrayLike = Object.prototype.toString.call(collection) === '[object Arguments]';
                }
            }

            if (!isArrayLike) {
                //log("if (!isArrayLike) {");
                return false;
            }

            //log('it is array-like');

            length = collection.length;

            if (length === 0) {
                //log("if (length === 0) {");
                return false;
            }

            matches = true;

            for (var i = 0, element; i < length; ++i) {
                element = collection[i];

                // Check, whether the element is NOT NaN, as if the element is equal to itself, it is not NaN
                if (element === element) {
                    if (!conditionIsNaN) {
                        if (element !== condition) {
                            matches = false;
                            break;
                        }
                    } else {
                        matches = false;
                        break;
                    }

                // If the element is NaN
                } else {
                    if (!conditionIsNaN) {
                        matches = false;
                        break;

                    // If the element and the condition are both NaNs, they are equal
                    } else {
                        matches = true;
                    }
                }
            }

            //log('matches:', matches);

            return matches;

        // If it is not a collection, then handle it as if it were a strict equality check
        } else {
            return collection === condition;
        }

        return matches;
    };

    module.exports = eachof;

/*
    //exports = eachof;
    return eachof;
}));
*/
