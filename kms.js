const exec = require('child_process').execSync;

module.exports.kms = () => {
    const ret = {};

    [
        'PIGII_CONSUMER_KEY',
        'PIGII_CONSUMER_SECRET',
        'PIGII_ACCESS_TOKEN_KEY',
        'PIGII_ACCESS_TOKEN_SECRET'
    ].forEach(key => {
        const cred = exec(`credstash -r ap-northeast-1 get ${key}`).toString().replace("\n", "");
        ret[key] = cred;
    })

    return ret;
};
