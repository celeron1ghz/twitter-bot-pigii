'use strict';

const MINUTES = 0;
const SECONDS = 0;
const twitter = require('twitter');
const pigii = require('./pigii.js');
const vo = require('vo');
const aws = require('aws-sdk');
const ssm = new aws.SSM();

module.exports.main = (event, context, callback) => {
    vo(function*(){
        const client  = new twitter({
            consumer_key:        (yield ssm.getParameter({ Name: '/pigii/consumer_key',        WithDecryption: true }).promise() ).Parameter.Value,
            consumer_secret:     (yield ssm.getParameter({ Name: '/pigii/consumer_secret',     WithDecryption: true }).promise() ).Parameter.Value,
            access_token_key:    (yield ssm.getParameter({ Name: '/pigii/access_token_key',    WithDecryption: true }).promise() ).Parameter.Value,
            access_token_secret: (yield ssm.getParameter({ Name: '/pigii/access_token_secret', WithDecryption: true }).promise() ).Parameter.Value,
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

        const data = yield client.post('statuses/update', { status: pigii.random_pigii_string() })

        console.log(`pigii finished: ${data.id}`);
        callback(null, data);
    })
    .catch(err => {
        console.log("error happen:", err);
        callback(err);
    });
};
