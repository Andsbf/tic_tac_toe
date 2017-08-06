import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import OpponentPicker from '../components/OpponentPicker';
import BackToMenu from '../components/BackToMenu';
import { onSelectOpponent, startNewGame } from '../actions/newGame';
import { fetchPlayers } from '../actions/session';


const style = {
  div: {
    textAlign: 'center'
  }
};

class NewGame extends Component {
  componentWillMount() {
    this.props.fetchPlayers()
  };

  render() {
    if(this.props.newGameId !== null) { return <Redirect to={ `/games/${this.props.newGameId}` }/>}

    const startButton = <button onClick={ this.props.onStartNewGame } className="btn btn-default" >Start Game</button>;

    const { opponents,onSelectOpponent, selectedOpponent } = this.props;

    return (
      <div className='row' style={ style.div }>
        <BackToMenu />
        <br/>
        <div className="breadcrumb col-md-2 col-md-offset-5">
          <OpponentPicker
            opponents={ opponents }
            onSelectOpponent={ onSelectOpponent }
            selectedOpponent={ selectedOpponent }
          />
          <br/>
          { selectedOpponent ? startButton : null }
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchPlayers() {  dispatch(fetchPlayers()) },
  onSelectOpponent(opponent) { dispatch(onSelectOpponent(opponent)) },
  onStartNewGame() { dispatch(startNewGame()) }
});

const mapStateToProps = (state) => ({
  opponents: state.session.players,
  selectedOpponent: state.newGame.opponent,
  newGameId: state.newGame.id
});

NewGame = connect(mapStateToProps, mapDispatchToProps)(NewGame);

export default NewGame;
