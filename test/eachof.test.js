var project = require('../project'),
    eachof  = require(project.script),
    assert  = require('assert'),
    should  = {
        beTrue  : function(result) {
            assert.strictEqual(result, true);
        },
        beFalse : function(result) {
            assert.strictEqual(result, false);
        }
    },
    xshould = {
        beTrue  : function() {},
        beFalse : function() {}
    },
    log     = console.log.bind(console);

describe('eachof ->', function() {
    var empty  = {
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
            },
            arguments  : (function() { return arguments; })()
        },
        array  = {
            same : {
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
                        integer : {
                            zeros      : [0,        0],
                            ones       : [1,        1],
                            nans       : [NaN,      NaN],
                            infinities : [Infinity, Infinity]
                        },
                        boolean : {
                            trues  : [true,  true],
                            falses : [false, false]
                        },
                        string : {
                            zeros   : ['0', '0'],
                            ones    : ['1', '1'],
                            empties : ['', '']
                        }
                    },
                    three : {
                        integer : {
                            zeros      : [0, 0, 0],
                            ones       : [1, 1, 1],
                            nans       : [NaN, NaN, NaN],
                            infinities : [Infinity, Infinity, Infinity]
                        },
                        boolean : {
                            trues  : [true, true, true],
                            falses : [false, false, false]
                        },
                        string : {
                            zeros   : ['0', '0', '0'],
                            ones    : ['1', '1', '1'],
                            empties : ['',  '',  '']
                        }
                    }
                }
            },
            different : {
                with : {
                    two : {
                        integer : {
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
                                    beginning : [0,   NaN],
                                    end       : [NaN, 0]
                                }
                            },
                            infinities : {
                                in : {
                                    beginning : [0,        Infinity],
                                    end       : [Infinity, 0]
                                }
                            }
                        },
                        boolean : {
                            trues : {
                                in : {
                                    beginning : [false, true],
                                    end       : [true,  false]
                                }
                            },
                            falses : {
                                in : {
                                    beginning : [true,  false],
                                    end       : [false, true]
                                }
                            }
                        },
                        string : {
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
                                    end       : ['',  '0']
                                }
                            }
                        }
                    },
                    three : {
                        integer : {
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
                                    beginning : [0,   NaN, NaN],
                                    middle    : [NaN, 0,   NaN],
                                    end       : [NaN, NaN, 0]
                                }
                            },
                            infinities : {
                                in : {
                                    beginning : [0,        Infinity, Infinity],
                                    middle    : [Infinity, 0,        Infinity],
                                    end       : [Infinity, Infinity, 0]
                                }
                            }
                        },
                        boolean : {
                            trues : {
                                in : {
                                    beginning : [false, true,  true],
                                    middle    : [true,  false, true],
                                    end       : [true,  true,  false]
                                }
                            },
                            falses : {
                                in : {
                                    beginning : [true,  false, false],
                                    middle    : [false, true,  false],
                                    end       : [false, false, true]
                                }
                            }
                        },
                        string : {
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
            }
        },
        object = {
            same : {
                with : {
                    one : {
                        integer : {
                            zero     : {a : 0},
                            one      : {a : 1},
                            nan      : {a : NaN},
                            infinity : {a : Infinity}
                        },
                        boolean : {
                            true  : {a : true},
                            false : {a : false}
                        },
                        string : {
                            zero  : {a : '0'},
                            one   : {a : '1'},
                            empty : {a : ''},
                        }
                    },
                    two : {
                        integer : {
                            zeros      : {a : 0,        b : 0},
                            ones       : {a : 1,        b : 1},
                            nans       : {a : NaN,      b : NaN},
                            infinities : {a : Infinity, b : Infinity}
                        },
                        boolean : {
                            trues  : {a : true,  b : true},
                            falses : {a : false, b : false}
                        },
                        string : {
                            zeros   : {a : '0', b : '0'},
                            ones    : {a : '1', b : '1'},
                            empties : {a : '',  b : ''}
                        }
                    },
                    three : {
                        integer : {
                            zeros      : {a : 0,        b : 0,        c : 0},
                            ones       : {a : 1,        b : 1,        c : 1},
                            nans       : {a : NaN,      b : NaN,      c : NaN},
                            infinities : {a : Infinity, b : Infinity, c : Infinity}
                        },
                        boolean : {
                            trues  : {a : true,  b : true,  c : true},
                            falses : {a : false, b : false, c : false}
                        },
                        string : {
                            zeros   : {a : '0', b : '0', c : '0'},
                            ones    : {a : '1', b : '1', c : '1'},
                            empties : {a : '',  b : '',  c : ''}
                        }
                    }
                }
            },
            different : {
                with : {
                    two : {
                        integer : {
                            zeros : {
                                in : {
                                    beginning : {a : 1, b : 0},
                                    end       : {a : 0, b : 1}
                                }
                            },
                            ones : {
                                in : {
                                    beginning : {a : 0, b : 1},
                                    end       : {a : 1, b : 0}
                                }
                            },
                            nans : {
                                in : {
                                    beginning : {a : 0,   b : NaN},
                                    end       : {a : NaN, b : 0}
                                }
                            },
                            infinities : {
                                in : {
                                    beginning : {a : 0,        b : Infinity},
                                    end       : {a : Infinity, b : 0       }
                                }
                            }
                        },
                        boolean : {
                            trues : {
                                in : {
                                    beginning : {a : false, b : true},
                                    end       : {a : true,  b : false}
                                }
                            },
                            falses : {
                                in : {
                                    beginning : {a : true,  b : false},
                                    end       : {a : false, b : true}
                                }
                            }
                        },
                        string : {
                            zeros : {
                                in : {
                                    beginning : {a : '1', b : '0'},
                                    end       : {a : '0', b : '1'}
                                }
                            },
                            ones : {
                                in : {
                                    beginning : {a : '0', b : '1'},
                                    end       : {a : '1', b : '0'}
                                }
                            },
                            empties : {
                                in : {
                                    beginning : {a : '0', b : ''},
                                    end       : {a : '',  b : '0'}
                                }
                            }
                        }
                    },
                    three : {
                        integer : {
                            zeros : {
                                in : {
                                    beginning : {a : 1, b : 0, c : 0},
                                    middle    : {a : 0, b : 1, c : 0},
                                    end       : {a : 0, b : 0, c : 1}
                                }
                            },
                            ones : {
                                in : {
                                    beginning : {a : 0, b : 1, c : 1},
                                    middle    : {a : 1, b : 0, c : 1},
                                    end       : {a : 1, b : 1, c : 0}
                                }
                            },
                            nans : {
                                in : {
                                    beginning : {a : 0,   b : NaN, c : NaN},
                                    middle    : {a : NaN, b : 0,   c : NaN},
                                    end       : {a : NaN, b : NaN, c : 0}
                                }
                            },
                            infinities : {
                                in : {
                                    beginning : {a : 0,        b : Infinity, c : Infinity},
                                    middle    : {a : Infinity, b : 0,        c : Infinity},
                                    end       : {a : Infinity, b : Infinity, c : 0}
                                }
                            }
                        },
                        boolean : {
                            trues : {
                                in : {
                                    beginning : {a : false, b : true,  c : true},
                                    middle    : {a : true,  b : false, c : true},
                                    end       : {a : true,  b : true,  c : false}
                                }
                            },
                            falses : {
                                in : {
                                    beginning : {a : true,  b : false, c : false},
                                    middle    : {a : false, b : true,  c : false},
                                    end       : {a : false, b : false, c : true}
                                }
                            }
                        },
                        string : {
                            zeros : {
                                in : {
                                    beginning : {a : '1', b : '0', c : '0'},
                                    middle    : {a : '0', b : '1', c : '0'},
                                    end       : {a : '0', b : '0', c : '1'}
                                }
                            },
                            ones : {
                                in : {
                                    beginning : {a : '0', b : '1', c : '1'},
                                    middle    : {a : '1', b : '0', c : '1'},
                                    end       : {a : '1', b : '1', c : '0'}
                                }
                            },
                            empties : {
                                in : {
                                    beginning : {a : '0', b : '',  c : ''},
                                    middle    : {a : '',  b : '0', c : ''},
                                    end       : {a : '',  b : '',  c : '0'}
                                }
                            }
                        }
                    }
                }
            }
        };

    it('should return false, when called without parameters (no parameters)', function() {
        should.beFalse( eachof() );
    });

    it('should return false, when called without a condition (1 parameter)', function() {
        should.beFalse( eachof(undefined)    );
        should.beFalse( eachof(null)         );
        should.beFalse( eachof(empty.array)  );
        should.beFalse( eachof(empty.object) );
    });

    describe('for edge cases', function() {
        describe('when NaNs are invovled', function() {
            it('should return true, when the collection and the condition both are NaNs', function() {
                should.beTrue( eachof(NaN, NaN) );
            });
            it('should return false, when the collection is NaN, but the condition isn\'t', function() {
                should.beFalse( eachof(NaN, true) );
            });
        });

        describe('when the collection and the condition both are primitives', function() {
            it('should return true, when they are scrictly equal to each other ( === )', function() {
                should.beTrue( eachof(undefined, undefined) );
                should.beTrue( eachof(null,      null)      );
                should.beTrue( eachof(0,         0)         );
                should.beTrue( eachof(-1,        -1)        );
                should.beTrue( eachof(1,         1)         );
                should.beTrue( eachof(true,      true)      );
                should.beTrue( eachof(false,     false)     );
                should.beTrue( eachof('',        '')        );
            });

            it('should return false, when they are scrictly not equal to each other ( !== )', function() {
                should.beFalse( eachof(undefined, null)      );
                should.beFalse( eachof(null,      undefined) );
                should.beFalse( eachof(0,         '0')       );
                should.beFalse( eachof(-1,        '-1')      );
                should.beFalse( eachof(1,         '1')       );
                should.beFalse( eachof(true,      1)         );
                should.beFalse( eachof(false,     0)         );
                should.beFalse( eachof('',        0)         );
            });
        });
    });

    describe('for non-collections', function() {
        it('should return false, when the passed non-collection does not match with the condition', function() {

        });

        it('should return true, when the passed non-collection does match with the condition', function() {

        });
    });

    describe('for arrays', function() {
        it('should return false, when an empty array was passed ( [] ), regardless of the condition', function() {
            should.beFalse( eachof(empty.array)            );
            should.beFalse( eachof(empty.array, undefined) );
            should.beFalse( eachof(empty.array, null)      );
            should.beFalse( eachof(empty.array, true)      );
            should.beFalse( eachof(empty.array, 1)         );
            should.beFalse( eachof(empty.array, '')        );
        });

        it('should return true, when the array contains the condition (primitive type)', function() {
            should.beTrue( eachof(array.same.with.one.boolean.true,     true)     );
            should.beTrue( eachof(array.same.with.one.integer.one,      1)        );
            should.beTrue( eachof(array.same.with.one.integer.nan,      NaN)      );
            should.beTrue( eachof(array.same.with.one.integer.infinity, Infinity) );

            should.beTrue( eachof(array.same.with.two.boolean.trues,      true)     );
            should.beTrue( eachof(array.same.with.two.integer.ones,       1)        );
            should.beTrue( eachof(array.same.with.two.integer.nans,       NaN)      );
            should.beTrue( eachof(array.same.with.two.integer.infinities, Infinity) );

            should.beTrue( eachof(array.same.with.three.boolean.trues,      true)     );
            should.beTrue( eachof(array.same.with.three.integer.ones,       1)        );
            should.beTrue( eachof(array.same.with.three.integer.nans,       NaN)      );
            should.beTrue( eachof(array.same.with.three.integer.infinities, Infinity) );
        });

        xit('should return false, when the passed array does not contain the condition', function() {
        });
    });
    describe('for plain objects', function() {
        it('should return false, when an empty object was passed ( {} ), regardless of the condition', function() {
            should.beFalse( eachof(empty.object)            );
            should.beFalse( eachof(empty.object, undefined) );
            should.beFalse( eachof(empty.object, null)      );
            should.beFalse( eachof(empty.object, true)      );
            should.beFalse( eachof(empty.object, 1)         );
            should.beFalse( eachof(empty.object, '')        );
        });

        it('should return true, when the object contains the condition (primitive type)', function() {
            should.beTrue( eachof(object.same.with.one.boolean.true,     true)     );
            should.beTrue( eachof(object.same.with.one.integer.one,      1)        );
            should.beTrue( eachof(object.same.with.one.integer.nan,      NaN)      );
            should.beTrue( eachof(object.same.with.one.integer.infinity, Infinity) );

            should.beTrue( eachof(object.same.with.two.boolean.trues,      true)     );
            should.beTrue( eachof(object.same.with.two.integer.ones,       1)        );
            should.beTrue( eachof(object.same.with.two.integer.nans,       NaN)      );
            should.beTrue( eachof(object.same.with.two.integer.infinities, Infinity) );

            should.beTrue( eachof(object.same.with.three.boolean.trues,      true)     );
            should.beTrue( eachof(object.same.with.three.integer.ones,       1)        );
            should.beTrue( eachof(object.same.with.three.integer.nans,       NaN)      );
            should.beTrue( eachof(object.same.with.three.integer.infinities, Infinity) );
        });
    });
    describe('for array-like objects', function() {
        it('should return false, when an empty array-like was passed, regardless of the condition', function() {
            should.beFalse( eachof(empty.typedArray.Int8Array,         1)  );
            should.beFalse( eachof(empty.typedArray.Uint8Array,        1)  );
            should.beFalse( eachof(empty.typedArray.Uint8ClampedArray, 1)  );
            should.beFalse( eachof(empty.typedArray.Int16Array,        1)  );
            should.beFalse( eachof(empty.typedArray.Uint16Array,       1)  );
            should.beFalse( eachof(empty.typedArray.Int32Array,        1)  );
            should.beFalse( eachof(empty.typedArray.Uint32Array,       1)  );
            should.beFalse( eachof(empty.typedArray.Float32Array,      .5) );
            should.beFalse( eachof(empty.typedArray.Float64Array,      .5) );
            should.beFalse( eachof(empty.arguments,                    1)  );
        });
    });
});
