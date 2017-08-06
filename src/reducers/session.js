import { LOGIN } from '../actions/login';
import { NEW_USER_CREATED } from '../actions/createUser';
import {
  POOLING_ON,
  POOLING_OFF,
  PLAYERS_FETCHED,
  SET_CURRENT_GAME,
  RESET_CURRENT_GAME
} from '../actions/session';

const initState = {
  access_token: null,
  username: null,
  polling: false,
  newGameId: null,
  currentGame: null,
  players: null
};

const session = (state = initState, action) => {
  switch (action.type) {
    case PLAYERS_FETCHED:
    return {
      ...state,
      players: action.players
    };

    case NEW_USER_CREATED:
    return {
      ...state,
      players: [
        ...state.players,
        action.user
      ]
    };

    case POOLING_ON:
    return {
      ...state,
      polling: true
    };

    case POOLING_OFF:
    return {
      ...state,
      polling: false
    };

    case SET_CURRENT_GAME:
    return {
      ...state,
      currentGame: action.gameId
    };

    case RESET_CURRENT_GAME:
    return {
      ...state,
      currentGame: null
    };

    case LOGIN:
    return {
      ...state,
      ...action.user
    };

    default:
    return state;
  }
};

export default session;
