const configEnv = require('./config.env.json');
const configGlobal = require('./config.global.json');

const config = { ...configGlobal, ...configEnv[process.env.SHORTURL_ENVIRONMENT] };

module.exports = config;
