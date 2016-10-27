exports.repeat = (str,repeat) => {
    return Array(repeat + 1).join(str);
};

exports.random_length_string = (str) => {
    var repeat;
    do { repeat = Math.floor(Math.random() * 10) } while ( repeat == 0 );
    return this.repeat(str, repeat);
};

exports.random_pigii_string = () => {
    return [
        'ピギィ',
        this.random_length_string('ィ'),
        this.random_length_string('イ'),
        'ーーーーーーーーーー',
    ].join('');
};
