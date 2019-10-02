import { useMachine } from 'react-robot';
import machine from './machine';
import ErrorMessage from './Error';
import Success from './Success';
import Form from './Form';

export default function ShortUrlForm() {
  const [current, send] = useMachine(machine);
  const {
    context: { url = '', alias = '', shortId = '', shortUrl = '', error = '', validationFailed = false },
    machine: { state }
  } = current.service;

  switch (state.name) {
    case 'success':
      return Success(send, alias, shortId, shortUrl);
    case 'saving':
      return null; // better show nothing as the saving time is too fast anyway.
    case 'error':
      return ErrorMessage(send, error);
    default:
      return Form(send, url, alias, validationFailed);
  }
}
