import React from 'react';
import copyToClipboard from 'copy-to-clipboard';

export default function Success(send, alias, shortId, shortUrl) {
  return (
    <>
      {alias && alias.length && shortId !== alias ? (
        <p
        >{`Sorry the alias ${alias} was already in use, we did generate a short url for you anyway. If you wish you can try again with another alias.`}</p>
      ) : null}
      <p>
        <span>Saved as </span>
        <a href={shortUrl}>{shortUrl}</a>
        <button type="button" className="copy" onClick={() => copyToClipboard(shortUrl)}>
          Copy to clipboard
        </button>
      </p>
      <button className="reset" onClick={() => send('init')}>
        Short another long url
      </button>
      <style jsx>{`
        .copy {
          display: block;
          margin: 20px 0 0;
          color: white;
          font-weight: bold;
          background-color: #4287f5;
        }
        .reset {
          margin-top: 10px;
          background-color: #b6bec2;
        }
      `}</style>
    </>
  );
}
