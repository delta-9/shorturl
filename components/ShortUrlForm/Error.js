import React from 'react';

export default function ErrorMessage(send, error) {
  return (
    <>
      <p>
        {`An error occured, please try again later. `}
        <strong>Error: {error.message}</strong>
      </p>
      <button className="reset" onClick={() => send('edit')}>
        Go back
      </button>
      <style jsx>{`
        strong {
          font-weigth: bold;
        }
        .reset {
          margin-top: 20px;
          background-color: #b6bec2;
        }
      `}</style>
    </>
  );
}
