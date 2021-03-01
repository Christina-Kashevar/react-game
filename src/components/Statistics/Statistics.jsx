import React from 'react';
import PropTypes from "prop-types";
import Backdrop from '../Backdrop/Backdrop';
import OkButton from '../OkButton/OkButton';
import './Statistics.scss';

const Statistics = ({isOpen, onClose}) => {
  const cls = ['modal']

  if (!isOpen) {
    cls.push('close')
  }

  return (
    <>
    {isOpen && <Backdrop onclick={onClose}/>}
    <div className={cls.join(' ')}>
      <p>Statistics</p>
      <OkButton onclick={onClose}/>
    </div>
    </>
  )
}

export default Statistics;

Statistics.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};