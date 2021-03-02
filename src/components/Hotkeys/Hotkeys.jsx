import React from 'react';
import PropTypes from "prop-types";
import Backdrop from '../Backdrop/Backdrop';
import OkButton from '../OkButton/OkButton';
import './Hotkeys.scss';

const Hotkeys = ({isOpen, onClose}) => {
  const cls = ['modal', 'hotkeys-wrapper']

  if (!isOpen) {
    cls.push('close')
  }

  return (
    <>
    {isOpen && <Backdrop onclick={onClose}/>}
    <div className={cls.join(' ')}>
      <h3>Hotkeys</h3>
      <p className='line-wrapper'><span className='key'>ctrl+a</span><span>open settings</span></p>
      <p className='line-wrapper'><span className='key'>ctrl+b</span><span>start new game</span></p>
      <p className='line-wrapper'><span className='key'>ctrl+c</span><span>open statistics</span></p>
      <p className='line-wrapper'><span className='key'>ctrl+s</span><span>open hot keys list</span></p>
      <p className='line-wrapper'><span className='key'>ctrl+a</span><span>start new game</span></p>
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

// checkPrevCards = (i) => {
//   const cardsToCheck = this.state.cards.slice(0, i+1);
//   let match = null;
//   for ( let j = 0; j < cardsToCheck.length - 1; i++) {
//     if (cardsToCheck[j].type === cardsToCheck[cardsToCheck.length - 1].type) {
//       match = j
//     }
//   }
//   return match;
// }