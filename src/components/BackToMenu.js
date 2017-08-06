import React from 'react'
import { Link } from 'react-router-dom';

const BackToMenu = () => (
  <div>
    <Link to={'/'}>
      <button className="btn btn-default" >
        <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span> Menu
      </button>
    </Link>
  </div>
);

export default BackToMenu;
