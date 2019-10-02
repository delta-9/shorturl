import React from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { useMachine } from 'react-robot';
import machine from './machine';
import { isURLValid, isAliasValid } from '../../utils/validation';

function Create() {
  const [current, send] = useMachine(machine);
  const {
    context: { url = '', alias = '', shortId = '', shortUrl = '', error = '', validationFailed = false },
    machine: { state }
  } = current.service;

  switch (state.name) {
    case 'success':
      return Success(send, alias, shortId, shortUrl);
    case 'save':
      return Save(send, url);
    case 'error':
      return ErrorMessage(send, error);
    default:
      return Form(send, url, alias, validationFailed);
  }
}

function ErrorMessage(send, error) {
  return (
    <>
      <p>{`An error occured, please try again later. ${error}`}</p>
      <button className="save" type="submit" onClick={() => send({ type: 'save' })}>
        Try again
      </button>
      <button className="reset" onClick={() => send('init')}>
        Reset values
      </button>
      <style jsx>{`
        .save {
          float: right;
          margin-top: 20px;
          color: white;
          font-weight: bold;
          background-color: #4287f5;
        }
        .reset {
          float: right;
          margin-top: 20px;
          background-color: #b6bec2;
        }
      `}</style>
    </>
  );
}

function Success(send, alias, shortId, shortUrl) {
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

function Save(send, url) {
  const phrases = [
    'Creating an hyper space connection to ',
    'Detecting an anomaly in space and time that lead to ',
    'Crafting portal to ',
    'Tunneling to ',
    'Shrinking '
  ];
  const phrase = phrases[Math.floor(Math.random() * Math.floor(phrases.length - 1))];
  return (
    <p>
      <span style={{ fontSize: 20 }}>{phrase}</span>
      {url}
    </p>
  );
}

function Form(send, url, alias, validationFailed) {
  const sendInput = name => event => send({ event, type: 'input', name });
  return (
    <>
      <label className="url" htmlFor="url">
        Enter the url to shorten
      </label>
      <div className="field url">
        <div className="input-group">
          <input
            autoFocus
            id="url"
            className="input-url"
            type="url"
            onChange={sendInput('url')}
            value={url}
            placeholder="https://www.google.com/"
          />
          {validationFailed && !isURLValid(url) ? (
            <p className="error">{!url || !url.length ? 'Please enter an url' : 'Please enter a valid url'}</p>
          ) : null}
        </div>
        <button className="save" type="submit" onClick={() => send({ type: 'save' })}>
          Short this url
        </button>
      </div>
      <label id="alias" className="input-alias" htmlFor="alias">
        (optional) Choose an alias
      </label>
      <div className="field alias">
        <div className="input-group">
          <input
            id="alias"
            type="text"
            maxLength="24"
            onChange={sendInput('alias')}
            value={alias}
            placeholder="googl"
          />
          {validationFailed && !isAliasValid(alias) ? (
            <p className="error">
              Alias length should be minimum 5 characters, contains only alphanumeric characters and no spaces
            </p>
          ) : null}
        </div>
      </div>
      <button className="reset" onClick={() => send('init')}>
        Reset values
      </button>

      <style jsx>{`
        .field {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 15px;
        }
        label {
          display: block;
          font-size: 18px;
          padding: 0 0 7px 0;
        }
        .field.url .input-group {
          flex: 1;
        }
        .field.url input {
          width: 100%;
          display: block;
          margin: auto;
        }
        .field.alias {
          clear: left;
        }
        .field.alias input {
          width: 150px;
        }
        input {
          display: inline-block;
          padding: 7px 10px;
          font-size: 14px;
          height: 41px;
        }
        .save {
          margin-left: 10px;
          margin-top: 0;
          color: white;
          font-weight: bold;
          background-color: #4287f5;
        }
        .reset {
          margin-top: 20px;
          background-color: #b6bec2;
        }
        p.error {
          color: #ff5500;
          margin: 2px 0;
          clear: both;
        }
      `}</style>
    </>
  );
}

export default Create;
