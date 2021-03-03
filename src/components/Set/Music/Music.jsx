import React from 'react';
import PropTypes from "prop-types";

const Music = ({musicVol, onChange}) => {
  return (
    <div className='line-wrapper'>
      <p>Music volume</p>
      <input
        type='range'
        min="0"
        max="10"
        id='music-range'
        value={musicVol}
        onChange={(e) => onChange(+e.target.value)}
        />
    </div>
  )
}

export default Music;

Music.propTypes = {
  musicVol: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};