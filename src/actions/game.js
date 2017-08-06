import {  GAME_OVER } from '../utils/gamesConstants';
import { checkBoard } from '../utils';
import { HttpJSON } from '../utils/HttpJSON';
import { DOMAIN } from '../env';

export const PLAYED_ACTION = 'PLAYED_ACTION';

export const playedAction = ({ gameId, gameState }) => ({
  type: PLAYED_ACTION,
  gameId: gameId,
  gameState: gameState
});

export const playerAction = (gameId, cell) => (dispatch, getState) => {
  const { username, access_token } = getState().session

  const game = getState().games[gameId]
  const newMoveCount = game.state.movesCount + 1
  const newCurrentPlayer = game.creatorUsername === username ? game.opponentUsername : game.creatorUsername

  let new_board = game.state.board.slice(0);
  new_board[cell.x][cell.y] = username;

  let status = checkBoard(new_board, cell, username, newMoveCount)

  let gameState = {
    ...game.state,
    movesCount: newMoveCount,
    board: new_board,
    currentPlayer: newCurrentPlayer,
    status: status,
    winner: status === GAME_OVER ? username : null,
    updatedAt: Math.floor(Date.now()/1000)
  }

  dispatch(playedAction({ gameId, gameState }))

  const body = {
    id: gameId,
    domain: DOMAIN,
    creatorUsername: game.creatorUsername,
    opponentUsername: game.opponentUsername,
    state: gameState
  };

  HttpJSON.PUT('/games', body, { accessToken: access_token })
   .catch(error => { console.log('ERROR: ', error )})
};
