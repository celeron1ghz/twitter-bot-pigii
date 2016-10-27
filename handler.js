'use strict';

let pigii = require('./pigii.js');

module.exports.pigii = (event, context, callback) => {
    console.log(new Date().toGMTString());
    callback(null, { message: pigii.random_pigii_string() });
};
