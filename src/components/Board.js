import React from 'react';
import PropTypes from 'prop-types';
import { IN_PROGRESS } from '../utils/gamesConstants';
import '../App.css';

const style = {
  display: 'inline-block',
  margin: '20px'
};

const Board = ({
  game,
  onPlayerAction,
  username
}) => {
  const board = game.state.board

  const displayBoard = board.map(row => row.map(cell => {
    if(!cell ) { return null }

    return cell ===  game.creatorUsername ? 'X' : 'O'
  }))


  const validateClick = (cellContent) => {
    return (cellContent === null) && (game.state.currentPlayer === username) && (game.state.status === IN_PROGRESS)
  }

  const onPlayerActionClick = (position) => {
    const cellPosition = { x: position[0], y: position[1] }

    validateClick(board[cellPosition.x][cellPosition.y]) && onPlayerAction(cellPosition)
  }

  return (
    <div style={style}>
      <table>
        <tbody>
          <tr>
            <td onClick={() => { onPlayerActionClick([0, 0]) } }>{ displayBoard[0][0] }</td>
            <td onClick={() => { onPlayerActionClick([0, 1]) } }>{ displayBoard[0][1] }</td>
            <td onClick={() => { onPlayerActionClick([0, 2]) } }>{ displayBoard[0][2] }</td>
          </tr>
          <tr>
            <td onClick={() => { onPlayerActionClick([1, 0]) } }>{ displayBoard[1][0] }</td>
            <td onClick={() => { onPlayerActionClick([1, 1]) } }>{ displayBoard[1][1] }</td>
            <td onClick={() => { onPlayerActionClick([1, 2]) } }>{ displayBoard[1][2] }</td>
          </tr>
          <tr>
            <td onClick={() => { onPlayerActionClick([2, 0]) } }>{ displayBoard[2][0] }</td>
            <td onClick={() => { onPlayerActionClick([2, 1]) } }>{ displayBoard[2][1] }</td>
            <td onClick={() => { onPlayerActionClick([2, 2]) } }>{ displayBoard[2][2] }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

Board.propTypes = {
  game: PropTypes.object.isRequired,
  onPlayerAction: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default Board;
