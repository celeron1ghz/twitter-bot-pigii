'use strict';

var MINUTES = 0;
var SECONDS = 0;

let pigii = require('./pigii.js');
let sleep = require('sleep-async')();

module.exports.pigii = (event, context, callback) => {
    console.log("invoked.");

    let now = new Date();
    let targetTime = new Date(now.getTime());
    targetTime.setHours(targetTime.getHours() + 1);
    targetTime.setMinutes(MINUTES);
    targetTime.setSeconds(SECONDS);

    let diff = targetTime.getTime() - now.getTime();

    if (diff >= 300000) {
        let mess = "Too far to invoke. invoke in 30 sec. sec=" + diff;
        console.log(mess);
        callback(null, { message: mess });
        return;
    }

    console.log('tweet after ' + diff + 'millisec...');

    sleep.sleep(diff, () => {
        console.log("let's pigii!!!!!");
        callback(null, { message: pigii.random_pigii_string() });
    });
};
