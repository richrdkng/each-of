// TODO: IE8 compatibility
// TODO: strict vs regular equality
// TODO: recursive checking
// TODO: function as a condition
// TODO: multiple conditions / array condition / object condition / array-like condition
// TODO: updated UMD
/* TODO: NaN check:
    - when it is in a collection,
    - also when it is the condition
*/

var log = console.log.bind(console);

(function (root, factory) {
    // For Node.js or CommonJS compatible loaders
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();

    // AMD - Anonymous module for RequireJS and compatible
    } else if (typeof define === 'function' && define.amd) {
        define(factory);

    // For using in the browser directly
    } else {
        root.eachof = factory();
    }
}(this, function () {
    "use strict";

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
                length = 0,
                temp   = [];

                for (element in collection) {
                    if (collection.hasOwnProperty(element)) {
                        temp[length++] = collection[element];
                    }
                }

                collection = temp;
        }

        return collection;
    }

    function isEqual(element, condition) {
        var elementIsNaN   = element !== element,
            conditionIsNaN = condition !== condition;

        // When the element is NaN, but the condition isn't, then return false
        if (elementIsNaN && !conditionIsNaN) {
            return false;
        }

        // When the collection and the condition are both NaNs, as they are certainly equal, return true
        if (elementIsNaN && conditionIsNaN) {
            return true;
        }

        // If the are strictly equal, return true
        if (element === condition) {
            return true;
        }

        if (isCollection(condition)) {
            for (var i = 0, length = condition.length; i < length; ++i) {
                if (element === condition[i]) {
                    return true;
                }
            }
        }

        return false;
    }

    function eachof(collection, condition) {

        // When no condition was given or called without parameters, return false
        if (arguments.length < 2) {
            return false;
        }

        // If it is a collection
        if (isCollection(collection)) {
            collection = asCollection(collection);

            if (collection.length === 0) {
                return false;
            }

            for (var i = 0, length = collection.length; i < length; ++i) {
                if (!isEqual(collection[i], condition)) {
                    return false;
                }
            }

            return true;
        }

        // Otherwise it is not a collection
        return isEqual(collection, condition);
    }

    return eachof;
}));
