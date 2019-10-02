import React from 'react';
import { isURLValid, isAliasValid } from '../../utils/validation';

export default function Form(send, url, alias, validationFailed) {
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
