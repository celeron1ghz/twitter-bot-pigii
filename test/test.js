'use strict';

var pigii  = require('../pigii.js');
var assert = require('assert');

describe('repeat()', () => {
    it('zero repeat',            () => assert.equal(pigii.repeat('a',  -1), '') );
    it('negative repeat',        () => assert.equal(pigii.repeat('a',  0),  '') );
    it('repeat empty char',      () => assert.equal(pigii.repeat('',   10), '') );
    it('repeat ascii char',      () => assert.equal(pigii.repeat('a',  10), 'aaaaaaaaaa') );
    it('repeat multi-byte char', () => assert.equal(pigii.repeat('あ', 10), 'ああああああああああ') );
});

describe('random_length_string()', () => {
    for (var i = 0; i < 10; i++) {
        var ret = pigii.random_length_string('a');
        var matcher = ret.match(/^a+$/);
        it('#' + i + ' ' + ret, () => assert.equal(ret, matcher[0]) );
    }
});

describe('random_pigii_string()', () => {
    for (var i = 0; i < 10; i++) {
        var ret = pigii.random_pigii_string();
        var matcher = ret.match(/^ピギィ+イ+ー+$/);
        it('#' + i + ' ' + ret, () => assert.equal(ret, matcher[0]) );
    }
});
