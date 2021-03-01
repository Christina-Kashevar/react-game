import React from 'react';
import PropTypes from "prop-types";
import ButtonChoice from '../ButtonChoice/ButtonChoice';
import './Level.scss';

const Level = ({onChangeLevel, activeBtns}) => {
  return (
    <div className='line-wrapper'>
      <p>Level</p>
      <div>
        <ButtonChoice text='4×4' val={4} onClick={onChangeLevel} activeBtns={activeBtns}/>
        <ButtonChoice text='6×6' val={6} onClick={onChangeLevel} activeBtns={activeBtns}/>
      </div>
    </div>
  )
};

export default Level;

Level.propTypes = {
  onChangeLevel: PropTypes.func.isRequired,
  activeBtns: PropTypes.array.isRequired,
};