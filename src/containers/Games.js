import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import { fetchGames } from '../actions/games';
import { startPool, stopPool } from '../actions/session';
import BackToMenu from '../components/BackToMenu';
import GameItem from '../components/GameItem';
import _ from 'lodash';

const style = {
  div: {
    textAlign: 'center'
  },
  title: {
    color: '#337ab7'
  }
};

class Games extends Component {
  componentWillMount() {
    this.props.startPolling()
  };

  componentWillUnmount(){
   this.props.stopPolling()
  };

  games = () => {
    const gamesAsHtml =
      _.values(this.props.games)
      .sort((a,b) => b.state.createdAt - a.state.createdAt)
      .map(game => <GameItem game={game} username={this.props.username} key={game.id}/>)

    return (
      <div>
        <h3 style={style.title}>My games</h3>
        <ul className="list-group">
          { gamesAsHtml }
        </ul>
      </div>
    )
  };

  render(){
    return (
      <div className='row' style={style.div}>
        <div className="col-md-4 col-md-offset-4">
          <BackToMenu />
          { this.props.games ? this.games() : <Loading message={ 'Fetching games...' }/>}
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
    fetchGames() {  dispatch(fetchGames()) },
    stopPolling() { dispatch(stopPool()) },
    startPolling() { dispatch(startPool()) }
});

const mapStateToProps = (state) => ({
  games: state.games,
  username: state.session.username,
});

Games = connect(mapStateToProps, mapDispatchToProps)(Games);

export default Games;
