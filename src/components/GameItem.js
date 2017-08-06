import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IN_PROGRESS, DRAW } from '../utils/gamesConstants';

const style = {
  item: {
    textAlign: 'left'
  },
  div: {
    margin: '5px'
  },
  status:{
    float: 'right',
    marginRight: '5px'
  }
};

const GameItem = ({ game, username }) => {
  const playIcon = 'glyphicon-play';
  const clockIcon = 'glyphicon-time';
  const eyeIcon = "glyphicon-eye-open";
  const drawIcon = 'glyphicon-th';
  const starIcon =  'glyphicon-star';
  const thumbsDownIcon = 'glyphicon-thumbs-down';

  const badgeAction = () => {
    if (game.state.status !== IN_PROGRESS) { return eyeIcon }

    return game.state.currentPlayer === username ? playIcon : clockIcon
  };

  const badgeStatus = () => {
    if (game.state.status === IN_PROGRESS) { return null }
    if (game.state.status === DRAW) { return drawIcon }

    return game.state.winner === username ? starIcon : thumbsDownIcon
  };

  const opponent = () => game.opponentUsername === username ? game.creatorUsername : game.opponentUsername;

  const createdDate = () => {
    const createdAt = new Date(game.state.createdAt*1000)
    return [createdAt.getDate(), createdAt.getMonth(), createdAt.getFullYear()].join('/')
  };

  return (
    <Link to={ '/games/' + game.id }>
      <li className="list-group-item" style={style.item}>
        <span style={ style.status}>
          <span className={ `glyphicon ${badgeStatus() }` } aria-hidden="true"></span>
        </span>
        <div style={style.div}>
          Opponent: <span className="glyphicon glyphicon-user" aria-hidden="true"></span> {opponent()}
        </div>
        <span style={style.status}>
          <span className={ `glyphicon ${badgeAction() }` } aria-hidden="true"></span>
        </span>
        <div style={style.div}>
          Started on { createdDate() }
        </div>
      </li>
    </Link>
  )
};

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
};

export default GameItem;
