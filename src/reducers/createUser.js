import {
  CREATING_USER,
  CLEAR_NEW_USER,
  NEW_USER_CREATED,
  NEW_USERNAME_UPDATE,
  NEW_USER_PASSWORD_UPDATE
} from '../actions/createUser'

const initState = {
 newUsername: null,
 newUserPassword: null,
 creating: false
};

const createUser = (state = initState, action) => {
  switch (action.type) {
    case NEW_USER_PASSWORD_UPDATE:
    return {
      ...state,
      newUserPassword: action.password,
    };

    case NEW_USERNAME_UPDATE:
    return {
      ...state,
      newUsername: action.username,
    };

    case CREATING_USER:
    return {
      ...state,
      creating: true
    };

    case NEW_USER_CREATED:
    return {
      ...initState
    };

    case CLEAR_NEW_USER:
    return {
      ...state,
      newUsername: null,
      newUserPassword: null
    };

    default:
    return state;
  }
};

export default createUser;
