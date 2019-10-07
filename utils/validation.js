import { isWebUri } from 'valid-url';

export function isAliasValid(alias) {
  const pattern = new RegExp('^[a-z0-9]+$', 'i');
  return !alias || !alias.length || (alias.length >= 5 && alias.length < 25 && !!pattern.test(alias));
}

export function isURLValid(url) {
  return url && url.length && url.length <= 2048 && isWebUri(url);
}
