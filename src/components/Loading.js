import React from 'react';
import PropTypes from 'prop-types';

const style = {
  textAlign: 'center',
  margin: '10px',
  color: '#337ab7'
};

const Loading = ({ message }) => (
  <div style={style}>
    <div className="progress">
      <div className="progress-bar progress-bar-striped active" role="progressbar" style={{width: '100%'}}>
      </div>
    </div>
    { message }
  </div>
);

Loading.propTypes = {
  message: PropTypes.string
};

export default Loading;
