import React from 'react';
import ticTacToe from '../tic_tac_toe.jpg';

const style = {
  div: {
    textAlign: 'center'
  },
  logo:{
    height: '55px',
    marginBottom: '30px',
    marginTop: '15px'
  }
};

const Header = () => (
  <div style={style.div}>
    <img src={ticTacToe} style={style.logo} className="App-logo" alt="logo" />
  </div>
);

export default Header;
