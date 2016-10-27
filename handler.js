'use strict';

module.exports.pigii = (event, context, callback) => {
    console.log(new Date().toGMTString());
    callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
