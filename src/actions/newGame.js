import { boardInit, IN_PROGRESS } from '../utils/gamesConstants';
import { HttpJSON } from '../utils/HttpJSON';
import { DOMAIN } from '../env';

export const OPPONENTS_FETCHED = 'OPPONENTS_FETCHED';
export const OPPONENT_SELECTED = 'OPPONENT_SELECTED';
export const NEW_GAME_CREATED = 'NEW_GAME_CREATED';

export const onSelectOpponent = (opponent) => ({
  type: OPPONENT_SELECTED,
  opponent
});

export const newGameCreated = (game) => ({
  type: NEW_GAME_CREATED,
  game
});

export const startNewGame = () => (dispatch, getState) => {
  const { username, access_token } = getState().session
  const { opponent } = getState().newGame

  const timeStamp = Math.floor(Date.now()/1000)

  const json = {
    domain: DOMAIN,
    creatorUsername: username,
    opponentUsername: opponent,
    state: {
      status: IN_PROGRESS,
      board: boardInit,
      currentPlayer: username,
      createdAt: timeStamp,
      updatedAt: timeStamp,
      movesCount: 0
    }
  }

  HttpJSON.POST('/games', json, { accessToken: access_token })
    .then(game => dispatch(newGameCreated(game)))
    .catch(error => { console.log('ERROR: ', error )})
};
