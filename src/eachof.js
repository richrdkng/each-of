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
// TODO: function as a condition
// TODO: multiple conditions / array condition / object condition / array-like condition
// TODO: UMD
/* TODO: NaN check:
    - when it is in a collection,
    - also when it is the condition
*/

var log = console.log.bind(console);

    function isCollection(collection) {
        var fulfills = false;

        if (collection && typeof collection === 'object') {

            switch(collection.constructor) {
                case Array:
                case Object:
                case Int8Array:
                case Uint8Array:
                case Uint8ClampedArray:
                case Int16Array:
                case Uint16Array:
                case Int32Array:
                case Uint32Array:
                case Float32Array:
                case Float64Array:
                    fulfills = true;
                    break;

                default:
                    fulfills = Object.prototype.toString.call(collection) === '[object Arguments]';
            }
        }

        return fulfills;
    }

    function asCollection(collection) {

        if (collection.constructor === Object) {
            var element,
                length         = 0,
                tempCollection = [];

                for (element in collection) {
                    if (collection.hasOwnProperty(element)) {
                        tempCollection[length++] = collection[element];
                    }
                }

                collection = tempCollection;
        }

        return collection;
    }

    function eachof(collection, condition) {
        var conditionIsCollection;

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

        if (isCollection(condition)) {
            conditionIsCollection = true;

            condition = asCollection(condition);
            if (condition.length === 0) {
                return false;
            }
        }

        // If it is a collection
        if (isCollection(collection)) {

            collection = asCollection(collection);

            if (collection.length === 0) {
                return false;
            }

            for (var i = 0, length = collection.length, element; i < length; ++i) {
                element = collection[i];

                // Check, whether the element is NOT NaN, as if the element is equal to itself, it is not NaN
                if (element === element) {
                    if (!conditionIsNaN) {
                        // If the condition is non-collection
                        if (!conditionIsCollection) {
                            if (element !== condition) {
                                return false;
                            }
                        } else {
                            for (var j = 0, len = condition.length, el; j < len; ++j) {
                                el = condition[j];

                                // If whether it is not NaN
                                if (el === el) {
                                    if (element !== el) {
                                        return false;
                                    }

                                // If the current element of the condition is NaN, but the current element of the
                                } else {
                                    return false;
                                }
                            }
                        }
                    } else {
                        return false;
                    }

                // Otherwise the element is NaN
                } else {
                    if (!conditionIsNaN) {
                        return false;
                    }
                }
            }

            return true;
        }

        // Otherwise it is not a collection, then handle it as if it were a strict equality check
        return collection === condition;
    }

    module.exports = eachof;

/*
    //exports = eachof;
    return eachof;
}));
*/
