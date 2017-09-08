'use strict';

const MINUTES = 0;
const SECONDS = 0;
const twitter = require('twitter');
const pigii = require('./pigii.js');
const cred = require('credstash-promise');
const vo = require('vo');

module.exports.main = (event, context, callback) => {
    vo(function*(){
        const client  = new twitter({
            consumer_key:        yield cred.fetchCred('PIGII_CONSUMER_KEY'),
            consumer_secret:     yield cred.fetchCred('PIGII_CONSUMER_SECRET'),
            access_token_key:    yield cred.fetchCred('PIGII_ACCESS_TOKEN_KEY'),
            access_token_secret: yield cred.fetchCred('PIGII_ACCESS_TOKEN_SECRET'),
        });

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
        yield new Promise((resolve,reject) => setTimeout(resolve, diff));

        console.log("let's pigii!!!!!");
        const data = yield client.post('statuses/update', { status: pigii.random_pigii_string() })

        console.log(`pigii finished. #${data.id} --> ${data.text}`);
        callback(null, data);
    })
    .catch(err => {
        console.log("error happen:", err);
        callback(err);
    });
};
