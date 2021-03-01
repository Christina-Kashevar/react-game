import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from "prop-types";
import OkButton from '../OkButton/OkButton';
import Level from './Level/Level';
import Category from './Category/Category';
import Difficulty from './Difficulty/Difficulty';
import './Settings.scss';

const Settings = ({isOpen, onClose, onChangeLevel, activeBtns, onChangeCategory,onChangeDifficulty}) => {
  const cls = ['modal', 'settings']

  if (!isOpen) {
    cls.push('close')
  }

  return (
    <>
    {isOpen && <Backdrop onclick={onClose}/>}
    <div className={cls.join(' ')}>
      <Level onChangeLevel={onChangeLevel} activeBtns={activeBtns}/>
      <Category onChangeCategory={onChangeCategory} activeBtns={activeBtns}/>
      <Difficulty onChangeDifficulty={onChangeDifficulty} activeBtns={activeBtns}/>
      <OkButton onclick={onClose}/>
      {/* <audio src={"../../sounds/sound.mp3"} id='sound'></audio> */}
    </div>
    </>
  )
}

export default Settings;

Settings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChangeLevel: PropTypes.func.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
  onChangeDifficulty: PropTypes.func.isRequired,
  activeBtns: PropTypes.array.isRequired,
};