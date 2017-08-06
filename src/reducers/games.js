import { NEW_GAME_CREATED } from '../actions/newGame';
import { GAMES_FETCHED, GAMES_UPDATE } from '../actions/games';
import { PLAYED_ACTION } from '../actions/game';
import omit from 'lodash/omit';

const initState = null

const session = (state = initState, action) => {
  switch (action.type) {
    case NEW_GAME_CREATED:
    return {
      ...state,
      [action.game.id]: action.game
    };

    case GAMES_UPDATE:
      let gamesUpdate = {}
      const currentGame = action.currentGame

      action.games.forEach(game => gamesUpdate[game.id] = game)

      // Only update the current game if its an opponent's move
      if(currentGame && state[currentGame].state.movesCount > gamesUpdate[currentGame].state.movesCount) {
        gamesUpdate = omit(gamesUpdate, action.currentGame)
      }

    return {
      ...state,
      ...gamesUpdate
    };

    case GAMES_FETCHED:
      let gamesFetched = {}

      for (let game of action.games) {
        gamesFetched[game.id] = game
      }

    return {
      ...state,
      ...gamesFetched
    };

    case PLAYED_ACTION:
    return {
      ...state,
      [action.gameId]: Object.assign({}, state[action.gameId], { state: action.gameState })
    };

    default:
    return state;
  }
};

export default session;
