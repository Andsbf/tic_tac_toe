import { HttpJSON } from '../utils/HttpJSON';
import { DOMAIN } from '../env';

export const CREATING_USER = 'CREATING_USER';
export const CLEAR_NEW_USER = 'CLEAR_NEW_USER';
export const NEW_USER_CREATED = 'NEW_USER_CREATED';
export const NEW_USERNAME_UPDATE = 'NEW_USERNAME_UPDATE';
export const NEW_USER_PASSWORD_UPDATE = 'NEW_USER_PASSWORD_UPDATE';

export const newUsernameChange = (username) => ({
  type: NEW_USERNAME_UPDATE,
  username: username
});

export const newUserPasswordChange = (password) => ({
  type: NEW_USER_PASSWORD_UPDATE,
  password: password
});

export const newUSerCreated = (user) => ({
  type: NEW_USER_CREATED,
  user: user
});

export const creatingUser = () => ({
  type: CREATING_USER
});

export const createUser = () => (dispatch, getState) => {
  dispatch(creatingUser())

  const { newUsername, newUserPassword } = getState().createUser
  const accessToken = getState().session.access_token
  const body = {domain: DOMAIN, username: newUsername, password: newUserPassword}

  HttpJSON.POST('/users', body, { accessToken })
    .then(json => dispatch(newUSerCreated(json)))
    .catch(error => { console.log('ERROR: ', error )})
};
