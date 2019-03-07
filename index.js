const crypto = require('crypto');
const fetch = require('node-fetch');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const defaultOptions = {
    algorithm: 'aes256',
    mimeType: 'audio/ogg',
    chunkSize: 1024 * 1024
};

module.exports.decrypt = (url, key, options) => {
    options = { ...defaultOptions, ...options };

    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(blob => {
            const keyBuf = Buffer.from(key);
            const cipher = crypto.createDecipher(options.algorithm, keyBuf);

            return new Promise(resolve => {
                let buffer = Buffer.alloc(0);
                cipher.on('readable', async () => {

                    while (null !== (chunk = cipher.read(options.chunkSize))) {
                        buffer = Buffer.concat([buffer, chunk]);
                        await sleep(0.1);
                    }
                });

                cipher.on('end', () => {
                    resolve(`data:${options.mimeType};base64,` + buffer.toString('base64'));
                });

                cipher.write(Buffer.from(blob).toString('base64'), 'base64');
                cipher.end();
            });
        })
        .catch((err) => {
            console.log(err)
        });
}
