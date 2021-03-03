import React from 'react';
import PropTypes from "prop-types";
import Card from '../Card/Card';
import './Game.scss';

const Game = ({
  moves,
  disabled,
  width,
  cards,
  flipped,
  solved,
  handleClick,
  category,
  movesLeft,
  limitedMoves,
  handleFullScreen,
  soundOn,
  soundToggler,
  musicOn,
  musicToggler,
  }) => {

  document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen;

  function enterFullscreen(id) {
    const el = document.getElementById(id);
  
    if (el.webkitRequestFullScreen) {
      el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      handleFullScreen();
    } else {
      handleFullScreen()
      el.mozRequestFullScreen();
    }

    document.querySelector('.full-screen').onclick = function(){
      exitFullscreen(id);
    }
  }
  function exitFullscreen(id) {
    document.cancelFullScreen();
    document.querySelector('.full-screen').onclick = function(){
      enterFullscreen(id);
    }
  }


  return (
    <div id="game-wrapper">
      <div className='game' id="game">
        <div className='top-line'>
          <div className='moves'>
            <p className='moves-text'>{ limitedMoves ? 'Moves left:': 'Moves:'}</p>
            <p className='moves-count'>{limitedMoves ? `${movesLeft}` : `${moves}`}</p>
          </div>
          <div className='sound'>
            <i className="material-icons" onClick={soundToggler}>{soundOn ?'music_note' : 'mic_off'}</i>
          </div>
          <div className='sound'>
             <i className="material-icons" onClick={musicToggler}>{musicOn ? 'play_arrow' : 'pause_circle'}</i>
          </div>
          <div className='full-screen' onClick={() => enterFullscreen('game-wrapper')}>Full Screen</div>
        </div>
        <div className='game-board' id='game-board'>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            type={card.type}
            width={width}
            height={width}
            flipped={flipped.includes(card.id)}
            solved={solved.includes(card.id)}
            handleClick={handleClick}
            disabled={disabled || solved.includes(card.id)}
            category={category}
          />
        ))}
        </div>
      </div>
    </div>
  )
}

export default Game;

Game.propTypes = {
  moves: PropTypes.number.isRequired,
  movesLeft: PropTypes.number.isRequired,
  limitedMoves: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired,
  handleFullScreen: PropTypes.func.isRequired,
  soundOn: PropTypes.bool.isRequired,
  soundToggler: PropTypes.func.isRequired,
  musicOn: PropTypes.bool.isRequired,
  musicToggler: PropTypes.func.isRequired,
}