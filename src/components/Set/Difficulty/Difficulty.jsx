import React from 'react';
import PropTypes from "prop-types";
import ButtonChoice from '../ButtonChoice/ButtonChoice';
import './Difficulty.scss';

const Difficulty = ({onChangeDifficulty, activeBtns}) => {
  return (
    <div className='line-wrapper'>
      <p>Level</p>
      <div>
        <ButtonChoice text='Limited Moves' val={true} onClick={onChangeDifficulty} activeBtns={activeBtns}/>
        <ButtonChoice text='Unlimited Moves' val={false} onClick={onChangeDifficulty} activeBtns={activeBtns}/>
      </div>
    </div>
  )
};

export default Difficulty;

Difficulty.propTypes = {
  onChangeDifficulty: PropTypes.func.isRequired,
  activeBtns: PropTypes.array.isRequired,
};