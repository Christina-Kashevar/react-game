import React from 'react';
import PropTypes from "prop-types";

const Sound = ({soundVol, onChange}) => {
  return (
    <div className='line-wrapper'>
      <p>Sound volume</p>
      <input
        type='range'
        min="0"
        max="10"
        id='sound-range'
        value={soundVol}
        onChange={(e) => onChange(+e.target.value)}
        />
    </div>
  )
}

export default Sound;

Sound.propTypes = {
  soundVol: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};