const url = require('url');
const knex = require('../../config/database');
const { publicBaseUrl } = require('../../config');

async function shortRedirection(req, res, dev = false) {
  const urlParts = url.parse(req.url);
  const pathname = urlParts.pathname.replace(/^\/|\/$/g, '');
  if (pathname.length && !pathname.includes('_') && !pathname.includes('-')) {
    try {
      const results = await knex
        .select('url')
        .from('short_url')
        .where('id', pathname);
      if (results && results[0] && results[0].url) {
        res.writeHead(301, { Location: results[0].url });
        res.end();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (dev) {
    return false;
  }
  res.writeHead(301, { Location: publicBaseUrl });
  res.end();
}

module.exports = shortRedirection;
