import React from 'react';
import PropTypes from "prop-types";
import Backdrop from '../Backdrop/Backdrop';
import OkButton from '../OkButton/OkButton';
import './WinModal.scss';

const WinModal = ({isOpen, onClose, moves, movesLeft}) => {
  const cls = ['modal', 'win-modal']

  if (!isOpen) {
    cls.push('close')
  }
  let info = (
    <>
      <p>YOU WON!</p>
      <p>with {moves} moves</p>
    </>
  )

  if (movesLeft === 0) {
    info = (
      <>
        <p>YOU LOST!</p>
        <p>Try again!</p>
      </>
    )
  }
  return (
    <>
    {isOpen && <Backdrop onclick={onClose}/>}
    <div className={cls.join(' ')}>
      {info}
      <OkButton onclick={onClose}/>
    </div>
    </>
  )
}

export default WinModal;

WinModal.propTypes = {
  moves: PropTypes.number.isRequired,
  movesLeft: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};