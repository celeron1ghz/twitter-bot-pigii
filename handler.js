'use strict';

var MINUTES = 0;
var SECONDS = 0;

let twitter = require('twitter');
let sleep   = require('sleep-async')();
let pigii   = require('./pigii.js');
require('date-utils');

let config  = require('./config.js');
let client  = new twitter(config);

Date.toString = () => { return this.toFormat("YYYY-MM-DD HH24:MI:SS") + this.getMilliseconds() };

module.exports.pigii = (event, context, callback) => {
    let now = new Date();
    let targetTime = new Date(now.getTime());
    targetTime.setHours(targetTime.getHours() + 1);
    targetTime.setMinutes(MINUTES);
    targetTime.setSeconds(SECONDS);

    let diff = targetTime.getTime() - now.getTime();

    if (diff >= 300000) {
        let mess = new Date() + ": Too far to invoke. invoke in 30 sec. sec=" + diff;
        console.log(mess);
        callback(null, { message: mess });
        return;
    }

    // millisec precision calculating
    diff = diff - 1000 + (1000 - now.getMilliseconds());
    console.log(new Date() + ': tweet after ' + diff + ' millisec...');

    sleep.sleep(diff, () => {
        console.log(new Date() + ": let's pigii!!!!!");

        client.post('statuses/update', {
            status: pigii.random_pigii_string()
        }, (error, tweet, response) => {
            if (error)  {
                console.log(new Date() + ": pigii failed. " + error);
                console.log(error);
                callback(null, error);
            } else {
                console.log(new Date() + ": pigii finished. #" + tweet.id + " --> " + tweet.text);
                callback(null, { id: tweet.id, tweet: tweet.text });
            }   
        });
    });
};
