import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const style = {
  div: {
    textAlign: 'center'
  },
  dropdown:{
    width: '100%'
  },
  hiddenOption: {
    display: 'none'
  }
};

const OpponentPicker = ({ opponents, selectedOpponent, onSelectOpponent }) => {
  if (!opponents) { return <Loading message={'Fetching opponents ...'}/> }

  const opponentsAsOptions = () => (
    opponents.map(opponent =>
      <option key={opponent.username} value={opponent.username} selected={selectedOpponent === opponent.username}>
        {opponent.username}
      </option>
    )
  );

  return(
    <div style={ style.div }>
      <h4>Pick an opponent</h4>
      <select style={style.dropdown} onChange={(input) => onSelectOpponent(input.target.value)}>
        <option selected disabled hidden style={style.hiddenOption} value=''></option>
        { opponentsAsOptions() }
      </select>
    </div>
  )
};

OpponentPicker.propTypes = {
  onSelectOpponent: PropTypes.func.isRequired,
  selectedOpponent: PropTypes.string,
  opponents: PropTypes.array
};

export default OpponentPicker;
