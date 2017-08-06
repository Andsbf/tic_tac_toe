import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const style = {
  div:{
    textAlign: 'center'
  },
  button: {
    width: '200px',
    margin: '5px',
    display: 'inline-block'
  }
};

const App = ({ isAdmin }) => {
  const createUserButton = (
    <div>
      <Link to={'/create_user'}>
        <button style={style.button} className="btn btn-default">Create User</button>
      </Link>
    </div>
  )

  return (
    <div style={style.div}>
      <Link to={'/new_game'}>
        <button style={style.button} className="btn btn-default">New Game</button>
      </Link>
      <br/>
      <Link to={'/games'}>
        <button style={style.button} className="btn btn-default">My Games</button>
      </Link>
      { isAdmin ? createUserButton : null}
      <div>
        <a href='/'>
          <button style={style.button} className="btn btn-default">Logout</button>
        </a>
      </div>
    </div>
  );
};

App.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

export default App;
