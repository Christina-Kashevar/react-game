import React from 'react';
import PropTypes from "prop-types";
import ButtonChoice from '../ButtonChoice/ButtonChoice';

const Level = ({onChangeCategory, activeBtns}) => {
  return (
    <div className='line-wrapper'>
      <p>Category</p>
      <div>
        <ButtonChoice text='Monuments' val='monuments' onClick={onChangeCategory} activeBtns={activeBtns}/>
        <ButtonChoice text='Food' val='food' onClick={onChangeCategory} activeBtns={activeBtns}/>
        <ButtonChoice text='Clothes' val='clothes' onClick={onChangeCategory} activeBtns={activeBtns}/>
        <ButtonChoice text='Objects' val='objects' onClick={onChangeCategory} activeBtns={activeBtns}/>
      </div>
    </div>
  )
};

export default Level;

Level.propTypes = {
  onChangeCategory: PropTypes.func.isRequired,
  activeBtns: PropTypes.array.isRequired,
};