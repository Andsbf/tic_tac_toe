import { HttpJSON } from '../utils/HttpJSON';
import { DOMAIN } from '../env';


export const LOGIN = 'LOGIN';
export const CLEAR_LOGIN = 'CLEAR_LOGIN';
export const AUTHORIZING = 'AUTHORIZING';
export const USERNAME_UPDATE = 'USERNAME_UPDATE';
export const PASSWORD_UPDATE = 'PASSWORD_UPDATE';
export const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';

export const usernameChange = (username) => ({
  type: USERNAME_UPDATE,
  username: username
});

export const passwordChange = (password) => ({
  type: PASSWORD_UPDATE,
  password: password
});

export const login = (user) => ({
  type: LOGIN, user
});

export const invalidCredentials = () => ({
  type: INVALID_CREDENTIALS
});

export const clearLogin = () => ({
  type: CLEAR_LOGIN
});

export const authorizing = () => ({
  type: AUTHORIZING
});

export const auth = () => (dispatch, getState) => {
  dispatch(authorizing())

  const { username, password } = getState().login

  const body = {domain: DOMAIN, username: username, password: password}

  HttpJSON.POST('/token', body, { username, password })
    .then(json => {
      dispatch(login(json))
      dispatch(clearLogin())
    })
    .catch(error => dispatch(invalidCredentials()))
};
