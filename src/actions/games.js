import { HttpJSON } from '../utils/HttpJSON';
import { POOL_TIME } from '../env';

export const GAMES_FETCHED = 'GAMES_FETCHED';
export const GAME_MOVE = 'GAME_MOVE';
export const GAMES_UPDATE = 'GAMES_UPDATE';

export const gamesFetched = (games) => ({
  type: GAMES_FETCHED,
  games
});

export const gamesUpdate = (games) => (dispatch, getState) => dispatch({
  type: GAMES_UPDATE,
  currentGame: getState().session.currentGame,
  username: getState().session.username,
  games
});

export const pool = () => (dispatch, getState) => {
  if(getState().session.polling) {
    setTimeout(() => dispatch(fetchGames()), POOL_TIME)
  }
};

export const fetchGames = () => (dispatch, getState) => {
  const { username, access_token } = getState().session

  HttpJSON.GET('/games',{ username, accessToken: access_token })
    .then(games => {
      getState().games ? dispatch(gamesUpdate(games)) : dispatch(gamesFetched(games))

      dispatch(pool())
    })
    .catch(error => { console.log('ERROR: ', error )})
};