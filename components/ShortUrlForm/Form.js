import React from 'react';
import { isURLValid, isAliasValid } from '../../utils/validation';

export default function Form(send, url, alias, validationFailed) {
  const sendInput = name => event => send({ event, type: 'input', name });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        send({ type: 'save' });
      }}
      noValidate
    >
      <label className="url" htmlFor="url">
        Enter the url to shorten
      </label>
      <div className="field url">
        <div className="input-group">
          <input
            autoFocus
            id="url"
            type="url"
            onChange={sendInput('url')}
            value={url}
            placeholder="https://www.google.com/"
            maxLength="2048"
          />
          {validationFailed && !isURLValid(url) ? (
            <p className="error">
              {!url || !url.length
                ? 'Please enter an url'
                : url.length > 2048
                  ? 'URL maximum length is 2048 characters'
                  : 'Please enter a valid url'}
            </p>
          ) : null}
        </div>
        <button className="save" type="submit">
          Short this url
        </button>
      </div>
      <label htmlFor="alias">(optional) Choose an alias</label>
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
      <button
        className="reset"
        onClick={e => {
          e.preventDefault();
          send('init');
        }}
      >
        Reset values
      </button>

      <style jsx>{`
        label {
          display: block;
          font-size: 18px;
          padding: 0 0 7px 0;
        }
        .field {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 15px;
        }
        .field.url .input-group {
          flex: 1;
        }
        .field.alias .input-group input {
          width: 150px;
        }
        .save {
          margin-left: 10px;
          margin-top: 0;
          color: white;
          font-weight: normal;
          background-color: #4287f5;
        }
        .reset {
          margin-top: 20px;
          background-color: #b6bec2;
        }
        p.error {
          color: #c76533;
          margin: 5px 0 0;
          background-color: #f5e0e0;
          border-radius: 3px;
          padding: 5px 10px;
          display: inline-block;
        }
      `}</style>
    </form>
  );
}
