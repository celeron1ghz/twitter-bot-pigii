'use strict';

const MINUTES = 0;
const SECONDS = 0;

const twitter = require('twitter');
const sleep   = require('sleep-async')();
const pigii   = require('./pigii.js');
require('date-utils');

const client  = new twitter({
    consumer_key:        process.env.PIGII_CONSUMER_KEY,
    consumer_secret:     process.env.PIGII_CONSUMER_SECRET,
    access_token_key:    process.env.PIGII_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.PIGII_ACCESS_TOKEN_SECRET,
});

Date.toString = () => { return this.toFormat("YYYY-MM-DD HH24:MI:SS") + this.getMilliseconds() };

module.exports.pigii = (event, context, callback) => {
    const now = new Date();
    const targetTime = new Date(now.getTime());
    targetTime.setHours(targetTime.getHours() + 1);
    targetTime.setMinutes(MINUTES);
    targetTime.setSeconds(SECONDS);

    let diff = targetTime.getTime() - now.getTime();

    if (diff >= 300000) {
        const mess = new Date() + ": Too far to invoke. invoke in 30 sec. sec=" + diff;
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
