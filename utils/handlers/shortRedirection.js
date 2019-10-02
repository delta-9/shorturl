const url = require('url');
const knex = require('../../config/database');

async function shortRedirection(req, res) {
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
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}

module.exports = shortRedirection;
