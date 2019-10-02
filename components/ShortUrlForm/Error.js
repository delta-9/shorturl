import React from 'react';

export default function ErrorMessage(send, error) {
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
