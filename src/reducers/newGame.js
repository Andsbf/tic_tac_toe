import {
  OPPONENT_SELECTED,
  NEW_GAME_CREATED
} from '../actions/newGame';

const initState = { id: null, opponents: null, opponent: null };

const newGame = (state = initState, action) => {
  switch (action.type) {
    case OPPONENT_SELECTED:
    return {
      ...state,
      opponent: action.opponent
    };

    case NEW_GAME_CREATED:
    return {
      ...state,
      id: action.game.id,
      opponent: null
    };

    default:
    return state;
  }
};

export default newGame;
