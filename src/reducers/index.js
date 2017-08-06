import { combineReducers } from 'redux';
import login from './login';
import newGame from './newGame';
import games from './games';
import session from './session';
import createUser from './createUser';

const reducers = combineReducers({
  games,
  login,
  session,
  newGame,
  createUser
});

export default reducers;
