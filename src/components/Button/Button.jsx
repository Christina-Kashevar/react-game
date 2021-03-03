import React from 'react'
import PropTypes from "prop-types";
import './Button.scss'

const Button = ({text, onClick, disabled = false}) => {
  return (
    <button
      onClick={onClick}
      className={text=== 'AUTOPLAY' ? 'button last' : 'button'}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}