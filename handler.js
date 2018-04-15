'use strict';

const MINUTES = 0;
const SECONDS = 0;
const twitter = require('twitter');
const pigii = require('./pigii.js');

module.exports.main = async (event, context, callback) => {
  try {
    const client  = new twitter({
      consumer_key:        process.env.PIGII_CONSUMER_KEY,
      consumer_secret:     process.env.PIGII_CONSUMER_SECRET,
      access_token_key:    process.env.PIGII_ACCESS_TOKEN,
      access_token_secret: process.env.PIGII_ACCESS_TOKEN_SECRET,
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
    await new Promise((resolve,reject) => setTimeout(resolve, diff));

    const data = await client.post('statuses/update', { status: pigii.random_pigii_string() })

    console.log(`pigii finished: ${data.id}`);
    callback(null, data);
  } catch(err) {
    console.log("error happen:", err);
    callback(err);
  }
};
