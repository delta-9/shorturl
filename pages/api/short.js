import Cors from 'micro-cors';
const generate = require('nanoid/generate');
const nolookalikes = require('nanoid-dictionary/nolookalikes');
import { publicBaseUrl } from '../../config';
import knex from '../../config/database';
import { isURLValid, isAliasValid } from '../../utils/validation';

const timestamp = () => Math.floor(Date.now() / 1000);

const cors = Cors({
  allowedMethods: ['POST', 'HEAD']
});

async function endpoint({ body: { url = '', alias = null } }, res) {
  if (!isURLValid(url) || !isAliasValid(alias)) {
    res.status(400).end();
    return;
  }

  // Reject url from our domain.
  if (url.startsWith(publicBaseUrl)) {
    res.status(400).end();
    return;
  }

  // Attempt to save the short url with an unique ID.
  let id = alias && alias.length ? alias : generate(nolookalikes, 7);

  // We have to implement this lookup, but in theory it should very rarely happen.
  let success = false;
  const maxLookup = 10; // Limit the number of lookup
  for (let i = 0; i < maxLookup && !success; i += 1) {
    try {
      const exists = await knex
        .select('id')
        .from('short_url')
        .where('id', id);
      if (exists && exists[0] && exists[0].id) {
        throw new Error('Id already exist');
      }
      success = true;
    } catch (error) {
      // Id already exists, try another one.
      id = generate(nolookalikes, 7);
    }
  }
  if (!success) {
    console.error('Impossible to generate a non-existing ID');
    res.status(503).end();
    return;
  }
  try {
    await knex
      .insert({
        id,
        created: timestamp(),
        url
      })
      .into('short_url');
  } catch (error) {
    console.log(error);
    res.status(500).end();
    return;
  }

  res.json({ id, shortUrl: `${publicBaseUrl}/${id}` });
}

export default cors(endpoint);
