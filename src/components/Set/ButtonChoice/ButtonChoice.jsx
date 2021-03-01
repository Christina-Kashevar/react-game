import React from 'react';
import PropTypes from "prop-types";
import './ButtonChoice.scss';

const ButtonChoice = ({text, val, onClick, activeBtns}) => {
  const cls = ['btn-choice']

  if(activeBtns.includes(text)) {
    cls.push('active-btn')
  }

  return (
    <button className={cls.join(' ')} onClick={(e)=> onClick(val, e)}>{text}</button>
  )
};

export default ButtonChoice;

ButtonChoice.propTypes = {
  text: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  onClick: PropTypes.func.isRequired,
  activeBtns: PropTypes.array.isRequired,
};