import {
  AUTHORIZING,
  USERNAME_UPDATE,
  PASSWORD_UPDATE,
  INVALID_CREDENTIALS,
  CLEAR_LOGIN
} from '../actions/login'

const initState = {
 invalidCredentials: false,
 username: null,
 password: null,
 authorizing: false
};

const login = (state = initState, action) => {
  switch (action.type) {
    case PASSWORD_UPDATE:
    return {
      ...state,
      password: action.password,
      invalidCredentials: false
    };

    case USERNAME_UPDATE:
    return {
      ...state,
      username: action.username,
      invalidCredentials: false
    };

    case INVALID_CREDENTIALS:
    return {
      ...state,
      invalidCredentials: true,
      authorizing: false
    };

    case AUTHORIZING:
    return {
      ...state,
      authorizing: true
    };

    case CLEAR_LOGIN:
    return {
      ...initState
    };

    default:
    return state;
  }
};

export default login;
