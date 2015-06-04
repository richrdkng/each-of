var project = require('../project'),
    eachof  = require(project.script),
    assert  = require('assert'),
    equal   = assert.strictEqual,
    log     = console.log.bind(console);

describe('eachof', function() {
    var empty     = {
            array      : [],
            object     : {},
            typedArray : {
                Int8Array         : new Int8Array(),
                Uint8Array        : new Uint8Array(),
                Uint8ClampedArray : new Uint8ClampedArray(),
                Int16Array        : new Int16Array(),
                Uint16Array       : new Uint16Array(),
                Int32Array        : new Int32Array(),
                Uint32Array       : new Uint32Array(),
                Float32Array      : new Float32Array(),
                Float64Array      : new Float64Array()
            }
        },
        same      = {
            with : {
                one : {
                    integer : {
                        zero     : [0],
                        one      : [1],
                        nan      : [NaN],
                        infinity : [Infinity]
                    },
                    boolean : {
                        true  : [true],
                        false : [false]
                    },
                    string : {
                        zero  : ['0'],
                        one   : ['1'],
                        empty : ['']
                    }
                },
                two : {
                    integers : {
                        zeros      : [0, 0],
                        ones       : [1, 1],
                        nans       : [NaN, NaN],
                        infinities : [Infinity, Infinity]
                    },
                    booleans : {
                        trues  : [true, true],
                        falses : [false, false]
                    },
                    strings : {
                        zeros   : ['0', '0'],
                        ones    : ['1', '1'],
                        empties : ['', '']
                    }
                },
                three : {
                    integers : {
                        zeros      : [0, 0, 0],
                        ones       : [1, 1, 1],
                        nans       : [NaN, NaN, NaN],
                        infinities : [Infinity, Infinity, Infinity]
                    },
                    booleans : {
                        trues  : [true, true, true],
                        falses : [false, false, false]
                    },
                    strings : {
                        zeros   : ['0', '0', '0'],
                        ones    : ['1', '1', '1'],
                        empties : ['', '', '']
                    }
                }
            }
        },
        different = {
            with : {
                two : {
                    integers : {
                        zeros : {
                            in : {
                                beginning : [1, 0],
                                end       : [0, 1]
                            }
                        },
                        ones : {
                            in : {
                                beginning : [0, 1],
                                end       : [1, 0]
                            }
                        },
                        nans : {
                            in : {
                                beginning : [0, NaN],
                                end       : [NaN, 0]
                            }
                        },
                        infinities : {
                            in : {
                                beginning : [0, Infinity],
                                end       : [Infinity, 0]
                            }
                        }
                    },
                    booleans : {
                        trues : {
                            in : {
                                beginning : [false, true],
                                end       : [true, false]
                            }
                        },
                        falses : {
                            in : {
                                beginning : [true, false],
                                end       : [false, true]
                            }
                        }
                    },
                    strings : {
                        zeros : {
                            in : {
                                beginning : ['1', '0'],
                                end       : ['0', '1']
                            }
                        },
                        ones : {
                            in : {
                                beginning : ['0', '1'],
                                end       : ['1', '0']
                            }
                        },
                        empties : {
                            in : {
                                beginning : ['0', ''],
                                end       : ['', '0']
                            }
                        }
                    }
                },
                three : {
                    integers : {
                        zeros : {
                            in : {
                                beginning : [1, 0, 0],
                                middle    : [0, 1, 0],
                                end       : [0, 0, 1]
                            }
                        },
                        ones : {
                            in : {
                                beginning : [0, 1, 1],
                                middle    : [1, 0, 1],
                                end       : [1, 1, 0]
                            }
                        },
                        nans : {
                            in : {
                                beginning : [0, NaN, NaN],
                                middle    : [NaN, 0, NaN],
                                end       : [NaN, NaN, 0]
                            }
                        },
                        infinities : {
                            in : {
                                beginning : [0, Infinity, Infinity],
                                middle    : [Infinity, 0, Infinity],
                                end       : [Infinity, Infinity, 0]
                            }
                        }
                    },
                    booleans : {
                        trues : {
                            in : {
                                beginning : [false, true, true],
                                middle    : [true, false, true],
                                end       : [true, true, false]
                            }
                        },
                        falses : {
                            in : {
                                beginning : [true, false, false],
                                middle    : [false, true, false],
                                end       : [false, false, true]
                            }
                        }
                    },
                    strings : {
                        zeros : {
                            in : {
                                beginning : ['1', '0', '0'],
                                middle    : ['0', '1', '0'],
                                end       : ['0', '0', '1']
                            }
                        },
                        ones : {
                            in : {
                                beginning : ['0', '1', '1'],
                                middle    : ['1', '0', '1'],
                                end       : ['1', '1', '0']
                            }
                        },
                        empties : {
                            in : {
                                beginning : ['0', '', ''],
                                middle    : ['', '0', ''],
                                end       : ['', '', '0']
                            }
                        }
                    }
                }
            }
        };

    it('should return false, when called without parameters', function() {
        equal(eachof(), false);
    });

    it('should return false, when called without a condition', function() {
        equal(eachof(undefined),    false);
        equal(eachof(null),         false);
        equal(eachof(empty.array),  false);
        equal(eachof(empty.object), false);
    });

    describe('for non-collections', function() {
        it('should return false, when the passed non-collection does not match with the condition', function() {
            
        });

        it('should return true, when the passed non-collection does match with the condition', function() {

        });
    });

    describe('for arrays', function() {
        it('should return false, when an empty array was passed ( [] ), regardless of the condition', function() {
            equal(eachof(empty.array),            false);
            equal(eachof(empty.array, undefined), false);
            equal(eachof(empty.array, null),      false);
            equal(eachof(empty.array, true),      false);
            equal(eachof(empty.array, 1),         false);
            equal(eachof(empty.array, ''),        false);
        });

        xit('should return false, when the passed array does not contain the condition', function() {
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
