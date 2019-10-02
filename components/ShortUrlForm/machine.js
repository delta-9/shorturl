import request from '../../utils/request';
import { createMachine, state, transition, guard, reduce, immediate, invoke } from 'robot3';
import { isURLValid, isAliasValid } from '../../utils/validation';

const initialState = () => ({ url: '', alias: '', error: '', shortId: '', shortUrl: '', validationFailed: false });

/**
 * This is the machine states.
 *
 * It describe the different state of the component, and their possible transitions.
 */
const machine = createMachine({
  init: state(immediate('edit', reduce(() => initialState()))),
  edit: state(
    transition('input', 'edit', reduce((state, { event, name }) => ({ ...state, [name]: event.target.value.trim() }))),
    transition('init', 'init'),
    transition('save', 'validate')
  ),
  validate: state(
    immediate('saving', guard(formInputsAreValid)),
    immediate('edit', reduce(state => ({ ...state, validationFailed: true })))
  ),
  saving: invoke(
    saveShortUrl,
    transition(
      'done',
      'success',
      reduce((state, res) => ({ ...state, shortId: res.data.id, shortUrl: res.data.shortUrl }))
    ),
    transition('error', 'error', reduce((state, ev) => ({ ...state, error: ev.error })))
  ),
  error: state(transition('init', 'init'), transition('save', 'validate')),
  success: state(transition('init', 'init'))
});

function formInputsAreValid(state) {
  return isURLValid(state.url) && isAliasValid(state.alias);
}

function saveShortUrl(data) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return request('/api/short', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
}

export default machine;
