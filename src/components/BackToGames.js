import React from 'react'
import { Link } from 'react-router-dom';

const BackToGames = () => (
  <div>
    <Link to={'/games'}>
      <button className="btn btn-default" >
        <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> My Games
      </button>
    </Link>
  </div>
);

export default BackToGames;
