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

  // Attempt to save the short url with an unique ID.
  let id = alias && alias.length ? alias : generate(nolookalikes, 7);
  let success = false;
  const maxLookup = 10;
  for (let i = 0; i < maxLookup; i += 1) {
    try {
      await knex
        .insert({
          id,
          created: timestamp(),
          url
        })
        .into('short_url');
    } catch (error) {
      // id already exists, try another one.
      id = generate(nolookalikes, 7);
      continue;
    }
    success = true;
    break;
  }
  if (!success) {
    res.status(503).end();
    return;
  }
  res.json({ id, shortUrl: `${publicBaseUrl}/${id}` });
}

export default cors(endpoint);
