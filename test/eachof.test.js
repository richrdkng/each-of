var project = require('../project'),
    eachof  = require(project.primary),
    assert  = require('assert'),
    equal   = assert.strictEqual;

describe('eachof', function() {
    describe('for arrays', function() {
        it('should return false, when an empty array was passed ( [] ), regardless of the condition', function() {
            equal(eachof([]),            false);
            equal(eachof([], undefined), false);
            equal(eachof([], null),      false);
            equal(eachof([], true),      false);
            equal(eachof([], 1),         false);
            equal(eachof([], ''),        false);
        });

        it('should return false, when no condition was passed, regardless of the array', function() {
            equal(eachof([]), false);
        });

        it('should return false, when the passed array does not contain the condition', function() {
            var arrayWith1 = [1],
                arrayWith2 = [1, 1],
                arrayWith3 = [1, 1, 1];

            equal(eachof(arrayWith1), 0);
            equal(eachof(arrayWith2), 0);
            equal(eachof(arrayWith3), 0);
        });
    });
    xdescribe('for plain objects', function() {});
    xdescribe('for arraylike objects', function() {});
});
