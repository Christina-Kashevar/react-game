import React from 'react'
import './Button.scss'

const Button = ({text, onClick, disabled}) => {
  return (
    <button
      onClick={onClick}
      className='button'
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button