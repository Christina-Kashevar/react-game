import React, {Component} from 'react';
import Hotkeys from 'react-hot-keys';
import Game from './components/Game/Game';
import Options from './components/Options/Options';
import Settings from './components/Set/Settings';
import Statistics from './components/Statistics/Statistics';
import WinModal from './components/WinModal/WinModal';
import HotkeysList from './components/Hotkeys/Hotkeys';
import Footer from './components/Footer/Footer';
import initializeDeck from './components/utils/initializeDeck';
import './index.scss';

const widthInitial = document.documentElement.clientWidth < 981 ? 450 : 560;
let storageInfo = localStorage.getItem('chrisGame');
if(storageInfo) {
  storageInfo = JSON.parse(storageInfo)
}

// let Hotkeys = window.ReactHotkeys;

class App extends Component {
  state={
    settingsOpen: storageInfo ? storageInfo['settingsOpen'] : false,
    statOpen: storageInfo ? storageInfo['statOpen'] : false,
    hotkeysOpen: storageInfo ? storageInfo['hotkeysOpen'] : false,
    winOpen: storageInfo ? storageInfo['winOpen'] : false,
    cards: storageInfo ? storageInfo['cards'] : [],
    flipped: storageInfo ? storageInfo['flipped'] : [],
    solved: storageInfo ? storageInfo['solved'] : [],
    dimension: widthInitial,
    disabled: storageInfo ? storageInfo['disabled'] : false,
    level: storageInfo ? storageInfo['level'] : 4,
    category: storageInfo ? storageInfo['category'] : 'clothes',
    moves: storageInfo ? storageInfo['moves'] : 0,
    activeBtns: storageInfo ? storageInfo['activeBtns'] : ['4×4', 'Clothes', 'Unlimited Moves'],
    movesLeft: storageInfo ? storageInfo['movesLeft'] : 16,
    limitedMoves: storageInfo ? storageInfo['limitedMoves'] : false,
    fullscreen: storageInfo ? storageInfo['fullscreen'] : false,
    autoplay: storageInfo ? storageInfo['autoplay'] : false,
    soundVolume: storageInfo ? storageInfo['soundVolume'] : 1,
    musicVolume: storageInfo ? storageInfo['musicVolume'] : 1,
    soundOn: storageInfo ? storageInfo['soundOn'] : true,
    musicOn: storageInfo ? storageInfo['musicOn'] : false,
  }

  componentDidMount() {
    if(this.state.cards.length === 0) {
      this.setState({
        cards: initializeDeck(this.state.category, this.state.level)
      });
    }
    this.preloadImages();
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  componentWillMount() {
    const resizeListener = window.addEventListener("resize", this.resizeBoard);
    return () => window.removeEventListener("resize", resizeListener);
  };

  resizeBoard = ( ) => {
      const smallScreen = document.documentElement.clientWidth < 981
      this.setState({
        dimension: smallScreen ? 450 : 560
      });
  }

  preloadImages = () => {
    this.state.cards.map(card => {
      const src = `/img/${this.state.category}/${card.type}`
      new Image().src = src
    })
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  saveToLocal=(key, value) => {
    const newObj = JSON.parse(JSON.stringify(this.state))
    newObj[key] = value
    localStorage.setItem("chrisGame", JSON.stringify(newObj));
  }

  settingsOpenHandler = () => {
    this.setState({
      settingsOpen: true
    })
    this.saveToLocal('settingsOpen', true)
  }

  statOpenHandler = () => {
    this.setState({
      statOpen: true
    })
    this.saveToLocal('statOpen', true)
  }

  hotkeysOpenHandler = () => {
    this.setState({
      hotkeysOpen: true
    })
    this.saveToLocal('hotkeysOpen', true)
  }

  autoPlayHandler = () => {
    this.setState({
      autoplay: true,
      moves: 0,
      flipped: [],
      solved: [],
      disabled: true,
      limitedMoves: false
    })
    const targetCards = this.state.cards;
    const length = targetCards.length
    for (let i = 0; i < length; i++) {
      ((ind)=> {
        setTimeout(() => {
          if(this.state.flipped.length === 0) {
            this.setState({flipped: [targetCards[i].id]})
            const target = this.checkPrevCards(i)
            if (target !== null) {
              setTimeout(() => {this.setState({
                flipped: [this.state.flipped[0], targetCards[target].id],
                moves: ++this.state.moves,
                solved: [...this.state.solved, this.state.flipped[0], targetCards[target].id]
              });
              this.resetCards();
            }, 2000)
            }
          } else if (this.state.flipped.length === 1) {
            this.setState({
              flipped: [this.state.flipped[0], targetCards[ind].id],
              moves: ++this.state.moves,
            });
            if (this.isMatch(targetCards[i].id)) {
              this.setState({solved: [...this.state.solved, this.state.flipped[0], targetCards[i].id]});
              this.resetCards();
            } else {
              setTimeout(this.resetCards, 1000)
            }
          }
          if (i === length -1) {
            setTimeout(this.autoPlayCheck, 3000)
          }
        }, 1000 + (3000 * ind));
      })(i);
    }
  }

  autoPlayCheck = () => {
    const targetCards = this.state.cards;
    const length = targetCards.length
    if ( this.state.solved.length !== length ) {
    let unsolvedCards = [];
    for (let j = 0; j < length; j++) {
      if(!this.state.solved.includes(targetCards[j].id)) {
        unsolvedCards.push(j)
      }
    }
    let sortedCards = [];
    const func = () => {for (let m = 1; m < unsolvedCards.length; m++) {
      const type = targetCards[sortedCards[sortedCards.length-1]].type
      if(targetCards[unsolvedCards[m]].type === type) {
        sortedCards.push(unsolvedCards[m]);
        unsolvedCards.splice(m,1)
        unsolvedCards = unsolvedCards.slice(1)

      }}
    }
    while(unsolvedCards.length !== 0) {
      sortedCards.push(unsolvedCards[0]);
      func()
    }

    for (let i = 0; i < sortedCards.length; i++) {
      ((ind)=> {
        setTimeout(() => {
          if(this.state.flipped.length === 0) {
            this.setState({flipped: [targetCards[sortedCards[i]].id]})
          } else if (this.state.flipped.length === 1) {
            this.setState({
              flipped: [this.state.flipped[0], targetCards[sortedCards[i]].id],
              moves: ++this.state.moves,
            });
            if (this.isMatch(targetCards[sortedCards[i]].id)) {
              this.setState({solved: [...this.state.solved, this.state.flipped[0], targetCards[sortedCards[i]].id]});
              this.resetCards();
            } else {
              setTimeout(this.resetCards, 1000)
            }
          }
        }, 1000 + (3000 * ind));
        if (i === sortedCards.length -1) {
          this.finishAutoPlay()
        }
      })(i);
    }
   } else {
     this.finishAutoPlay()
   }
  }

  finishAutoPlay = () => {
    setTimeout(() => {
      this.setState({autoplay: false, disabled: false})
      const newObj = JSON.parse(JSON.stringify(this.state))
      newObj.autoplay = false
      newObj.disabled = false
      localStorage.setItem("chrisGame", JSON.stringify(newObj));
    }, 3000)
  }

  checkPrevCards = (i) => {
    const cardsToCheck = this.state.cards.slice(0, i+1);
    let match = null;
    for ( let j = 0; j < cardsToCheck.length - 1; j++) {
      if (cardsToCheck[j].type === cardsToCheck[i].type) {
        match = j
      }
    }
    return match;
  }

  playSound = () => {
    if(!this.state.soundOn) {
      return
    }
    const audio = document.querySelector('#sound');
    audio.volume = (document.querySelector('#sound-range').value)/10;
    audio.currentTime = 0;
    audio.play();
  }

  soundToggler = () => {
    this.setState({
      soundOn: !this.state.soundOn
    })
    this.saveToLocal('soundOn', !this.state.soundOn)
  }

  musicToggler = () => {
    this.setState({musicOn: !this.state.musicOn})
    const audio = document.querySelector('#music');
    if(this.state.musicOn) {
      audio.pause();
    } else {
    audio.volume = (document.querySelector('#music-range').value)/10;
    audio.currentTime = 0;
    audio.play();
    }
  }

  onChangeSoundVol = (vol) => {
    this.setState({soundVolume: vol})
    this.saveToLocal('soundVolume', vol)
  }

  onChangeMusicVol = (vol) => {
    this.setState({musicVolume: vol})
    const audio = document.querySelector('#music');
    audio.volume = (document.querySelector('#music-range').value)/10;
    this.saveToLocal('musicVolume', vol)
  }

  handleClick = (id) => {
    this.playSound();
    this.setState({disabled: true})
    const newObj = JSON.parse(JSON.stringify(this.state))
    if (this.state.flipped.length === 0) {
      this.setState({flipped: [id]})
      this.setState({disabled: false})
    } else {
      if (this.sameCardClicked(id)) return;
      this.setState({
        flipped: [this.state.flipped[0], id],
        moves: ++this.state.moves,
      });
      newObj.flipped = []
      if(this.state.limitedMoves) {
        this.setState({
          movesLeft: --this.state.movesLeft
        });
      }
      if(this.state.movesLeft === 0) {
        this.setState({winOpen: true})
      }
      if (this.isMatch(id)) {
        this.setState({solved: [...this.state.solved, this.state.flipped[0], id]});
        this.resetCards();
        this.isGameFinished();
        newObj.solved = [...this.state.solved, this.state.flipped[0], id]
      } else {
        setTimeout(this.resetCards, 1000)
      }
    }
    localStorage.setItem("chrisGame", JSON.stringify(newObj));
  };

  resetCards = () => {
    this.setState({flipped: [], disabled: false})
    const newObj = JSON.parse(JSON.stringify(this.state))
    newObj.flipped=[]
    newObj.disabled=false
    localStorage.setItem("chrisGame", JSON.stringify(newObj));
  }

  sameCardClicked = (id) => {
    this.setState({disabled: false})
    this.saveToLocal('disabled', false)
    return this.state.flipped.includes(id);
  }

  isGameFinished() {
    if ((this.state.cards.length - 2) === this.state.solved.length) {
      this.setState({winOpen: true})
      let results = localStorage.getItem('chrisResults');
      if(results) {
        results = JSON.parse(results)
      } else {
        results= {
          4: [],
          6: []
        }
      }
      results[this.state.level].push(this.state.moves)
      results[this.state.level].sort((a,b) => a- b)
      if (results[this.state.level].length > 10) {
        results[this.state.level] = results[this.state.level].slice(0, 10)
      }
      localStorage.setItem("chrisResults", JSON.stringify(results));
    }
  }

  isMatch = (id) => {
    const clickedCard = this.state.cards.find((card) => card.id === id);
    const flippedCard = this.state.cards.find((card) => this.state.flipped[0] === card.id);
    return flippedCard.type === clickedCard.type;
  };

  startNewGame = () => {
    this.setState({
      cards: initializeDeck(this.state.category, this.state.level),
      flipped: [],
      solved: [],
      moves: 0,
      movesLeft: this.state.level * 4
    });
    this.preloadImages()
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  winModalHandler = () => {
    this.setState({ winOpen: false});
    this.startNewGame();
    this.saveToLocal('winOpen', false)
  }

  changeLevel =(val, e) => {
    const newArr = [...this.state.activeBtns]
    newArr[0] = e.target.innerText
    this.setState({
      level: val,
      activeBtns: newArr,
      movesLeft: val*4
    })
    const newObj = JSON.parse(JSON.stringify(this.state))
    newObj.level = val
    newObj.activeBtns = newArr
    newObj.movesLeft = val*4
    localStorage.setItem("chrisGame", JSON.stringify(newObj));
  }

  changeCategory =(val, e) => {
    const newArr = [...this.state.activeBtns]
    newArr[1] = e.target.innerText
    this.setState({
      category: val,
      activeBtns: newArr,
      cards: initializeDeck(val, this.state.level),
    })
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  changeDifficulty = (val, e) => {
    const newArr = [...this.state.activeBtns]
    newArr[2] = e.target.innerText
    this.setState({
      activeBtns: newArr,
      limitedMoves: val,
    })
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  fullscreenToggle = () => {
    this.setState({ fullscreen: !this.state.fullscreen})
    if (!this.state.fullscreen) {
      this.setState({ dimension: Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )})
    } else {
      this.resizeBoard()
    }
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  settingsHandler = () => {
    this.setState({settingsOpen: false})
    this.startNewGame()
    this.saveToLocal('settingsOpen', false)
  }

  statHandler = () => {
    this.setState({statOpen: false})
    this.saveToLocal('statOpen', false)
    localStorage.setItem("chrisGame", JSON.stringify(newObj))
  }

  hotkeysHandler =() => {
    this.setState({hotkeysOpen: false}),
    this.saveToLocal('hotkeysOpen', false)
    localStorage.setItem("chrisGame", JSON.stringify(newObj))
  }

  render() {
    return (
      <div className='wrapper'>
        <Hotkeys
          keyName="shift+a"
          onKeyDown={() =>this.setState({settingsOpen: true})}
        />
        <Hotkeys
          keyName="shift+b"
          onKeyDown={() => this.startNewGame()}
        />
        <Hotkeys
          keyName="shift+c"
          onKeyDown={()=> this.setState({statOpen: true})}
        />
        <Hotkeys
          keyName="shift+s"
          onKeyDown={()=> this.setState({hotkeysOpen: true})}
        />
        <Hotkeys
          keyName="shift+d"
          onKeyDown={()=> this.autoPlayHandler()}
        />
        <Settings
          isOpen={this.state.settingsOpen}
          onClose={this.settingsHandler}
          activeBtns={this.state.activeBtns}
          onChangeLevel = {this.changeLevel}
          onChangeCategory ={this.changeCategory}
          onChangeDifficulty={this.changeDifficulty}
          soundVol={this.state.soundVolume}
          onChangeSoundVol={this.onChangeSoundVol}
          musicVol={this.state.musicVolume}
          onChangeMusicVol={this.onChangeMusicVol}
        />
        <Statistics
          isOpen={this.state.statOpen}
          onClose={this.statHandler}
          win={this.state.winOpen}
        />
        <HotkeysList
          isOpen={this.state.hotkeysOpen}
          onClose={this.hotkeysHandler}
        />
        <WinModal
          isOpen={this.state.winOpen}
          onClose={this.winModalHandler}
          moves={this.state.moves}
          movesLeft={this.state.movesLeft}
        />
        <div className='layout'>
          <Game
            moves={this.state.moves}
            movesLeft={this.state.movesLeft}
            limitedMoves={this.state.limitedMoves}
            cards={this.state.cards}
            width={this.state.dimension / this.state.level * 0.95}
            flipped={this.state.flipped}
            handleClick={this.handleClick}
            disabled={this.state.disabled}
            solved={this.state.solved}
            category={this.state.category}
            handleFullScreen={this.fullscreenToggle}
            soundOn={this.state.soundOn}
            soundToggler={this.soundToggler}
            musicOn={this.state.musicOn}
            musicToggler={this.musicToggler}
          />
          <Options
            newGameClick={this.startNewGame}
            settingsClick={this.settingsOpenHandler}
            statClick={this.statOpenHandler}
            hotkeysClick={this.hotkeysOpenHandler}
            autoPlayClick={this.autoPlayHandler}
            disabled={this.state.autoplay}
          />
        </div>
        <audio id='sound'><source src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" /></audio>
        <audio id='music' loop><source src="https://drivemusic.club/dl/pXqN7JxgIoJSZ3_eYrqz1Q/1614825131/download_music/2013/11/ludovico-einaudi-life.mp3"/></audio>
        <Footer />
      </div>
    )
  }

}

export default App;