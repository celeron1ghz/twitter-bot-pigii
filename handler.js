'use strict';

const MINUTES = 0;
const SECONDS = 0;
const twitter = require('twitter');
const sleep   = require('sleep-async')();
const pigii   = require('./pigii.js');
const client  = new twitter({
    consumer_key:        process.env.PIGII_CONSUMER_KEY,
    consumer_secret:     process.env.PIGII_CONSUMER_SECRET,
    access_token_key:    process.env.PIGII_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.PIGII_ACCESS_TOKEN_SECRET,
});

module.exports.main = (event, context, callback) => {
    Promise.resolve()
        .then(data => {
            const now = new Date();
            const targetTime = new Date(now.getTime());
            targetTime.setHours(targetTime.getHours() + 1);
            targetTime.setMinutes(MINUTES);
            targetTime.setSeconds(SECONDS);

            let diff = targetTime.getTime() - now.getTime();

            if (diff >= 300000) {
                throw Error(`Too far to invoke. invoke in 30 sec. sec=${diff}`);
            }

            // millisec precision calculating
            diff = diff - 1000 + (1000 - now.getMilliseconds());
            console.log('tweet after ' + diff + ' millisec...');
            return new Promise((resolve,reject) => sleep.sleep(diff, resolve));
        })
        .then(data =>
            new Promise((resolve,reject) => {
                console.log("let's pigii!!!!!");
                client.post('statuses/update', { status: pigii.random_pigii_string() }, (error, tweet, response) => {
                    if (error) { reject(error) } else { resolve(tweet) }
                });
            })
        )
        .then(data => {
            console.log(`pigii finished. #${data.id} --> ${data.text}`);
            callback(null, data);
        })
        .catch(err => {
            console.log("error happen.", err);
            callback(err);
        });
};
