import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from '../components/Board';
import BackToGames from '../components/BackToGames';
import { fetchGames } from '../actions/games';
import { playerAction } from '../actions/game';
import { IN_PROGRESS, DRAW } from '../utils/gamesConstants';
import {
  startPool,
  stopPool,
  setCurrentGame,
  resetCurrentGame
} from '../actions/session';

const style = {
  textAlign: 'center'
};

class Game extends Component {
  componentWillMount() {
    this.props.startPooling()
    if (this.props.game) { this.props.setCurrentGame() }
  };

  componentWillUnmount(){
    this.props.resetCurrentGame()
    this.props.stopPooling()
  };

  render(){
    const { onPlayerAction, username, game } = this.props;

    const result = () => {
      if (game.state.status === IN_PROGRESS) { return null }
      if (game.state.status === DRAW) { return 'Draw' }

      return 'You ' + (game.state.winner === username ? 'Won' : 'Lost')
    };

    const playerSymbol = () => game.creatorUsername === username ? 'cross' : 'circle';

    const turn = () => {
      if (game.state.status !== IN_PROGRESS) { return }

      return game.state.currentPlayer === username ? 'Your turn!' : 'Waiting for opponent ...'
    };

    return (
      <div style={style}>
        <BackToGames />
        <br/>
        You are the { playerSymbol() }
        <br/>
        <Board game={ game } username={ username } onPlayerAction={ onPlayerAction } />
        <br/>
        <div>{ turn() }</div>
        <br/>
        <div>{ result() }</div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps,a) => {
  const gameId = ownProps.match.params.id

  return ({
      onPlayerAction(cell) { dispatch( playerAction(gameId, cell)) },
      fetchGames(input) { dispatch(fetchGames()) },
      startPooling() { dispatch(startPool()) },
      stopPooling() { dispatch(stopPool()) },
      setCurrentGame() { dispatch(setCurrentGame(gameId)) },
      resetCurrentGame() { dispatch(resetCurrentGame()) },
    })
}

const mapStateToProps = (state, ownProps) => {
  const gameId = ownProps.match.params.id
  const game = state.games ? state.games[gameId] : null

  return ({
    username: state.session.username,
    game:  game
  })
};

Game.propTypes = {
  onPlayerAction: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  startPooling: PropTypes.func.isRequired,
  stopPooling: PropTypes.func.isRequired,
  setCurrentGame: PropTypes.func.isRequired,
  resetCurrentGame: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  game: PropTypes.object.isRequired
};

Game = connect(mapStateToProps, mapDispatchToProps)(Game);

export default Game;
