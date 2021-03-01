import React from 'react';
import PropTypes from "prop-types";
import Backdrop from '../Backdrop/Backdrop';
import OkButton from '../OkButton/OkButton';
import './Hotkeys.scss';

const Hotkeys = ({isOpen, onClose}) => {
  const cls = ['modal']

  if (!isOpen) {
    cls.push('close')
  }

  return (
    <>
    {isOpen && <Backdrop onclick={onClose}/>}
    <div className={cls.join(' ')}>
      <p>Hotkeys</p>
      <OkButton onclick={onClose}/>
    </div>
    </>
  )
}

export default Hotkeys;

Hotkeys.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};