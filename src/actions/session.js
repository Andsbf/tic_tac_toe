import { HttpJSON } from '../utils/HttpJSON';
import { fetchGames } from './games';

export const POOLING_ON = 'POOLING_ON';
export const POOLING_OFF = 'POOLING_OFF';
export const SET_CURRENT_GAME = 'SET_CURRENT_GAME';
export const RESET_CURRENT_GAME = 'RESET_CURRENT_GAME';
export const PLAYERS_FETCHED = 'PLAYERS_FETCHED';

export const poolOn = () => ({ type: POOLING_ON });

export const stopPool = () => ({ type: POOLING_OFF });

export const setCurrentGame = (gameId) => ({ type: SET_CURRENT_GAME, gameId })

export const resetCurrentGame = (gameId) => ({ type: RESET_CURRENT_GAME })

export const startPool = () => (dispatch, getState) => {
  dispatch(poolOn())
  dispatch(fetchGames())
};

export const playersFetched = (players) => ({
  type: PLAYERS_FETCHED,
  players
});

export const fetchPlayers =  () => (dispatch, getState) => {
  const { username, access_token } = getState().session

  HttpJSON.GET('/users', { accessToken: access_token })
    .then(players => {
      const otherPlayers = players.filter((player)=> player.username !== username);
      dispatch(playersFetched(otherPlayers))
    })
    .catch(error => { console.log('ERROR: ', error) })
};