import React, {Component} from 'react';
import Game from './components/Game/Game';
import Options from './components/Options/Options';
import Settings from './components/Set/Settings';
import Statistics from './components/Statistics/Statistics';
import WinModal from './components/WinModal/WinModal';
import Hotkeys from './components/Hotkeys/Hotkeys';
import Footer from './components/Footer/Footer';
import initializeDeck from './components/utils/initializeDeck';
import './index.scss';

const widthInitial = document.documentElement.clientWidth < 981 ? 450 : 560;
let storageInfo = localStorage.getItem('chrisGame');
if(storageInfo) {
  storageInfo = JSON.parse(storageInfo)
}
console.log(storageInfo)

class App extends Component {
  state={
    settingsOpen: storageInfo ? storageInfo['settingsOpen'] : false,
    statOpen: storageInfo ? storageInfo['statOpen'] : false,
    hotkeysOpen: storageInfo ? storageInfo['hotkeysOpen'] : false,
    winOpen: storageInfo ? storageInfo['winOpen'] : false,
    cards: storageInfo ? storageInfo['cards'] : [],
    flipped: storageInfo ? storageInfo['flipped'] : [],
    solved: storageInfo ? storageInfo['solved'] : [],
    dimension: storageInfo ? storageInfo['dimension'] : widthInitial,
    disabled: storageInfo ? storageInfo['disabled'] : false,
    level: storageInfo ? storageInfo['level'] : 4,
    category: storageInfo ? storageInfo['category'] : 'clothes',
    moves: storageInfo ? storageInfo['moves'] : 0,
    activeBtns: storageInfo ? storageInfo['activeBtns'] : ['4×4', 'Clothes', 'Unlimited Moves'],
    movesLeft: storageInfo ? storageInfo['movesLeft'] : 16,
    limitedMoves: storageInfo ? storageInfo['limitedMoves'] : false,
    fullscreen: storageInfo ? storageInfo['fullscreen'] : false
  }

  componentDidMount() {
    if(this.state.cards.length === 0) {
      this.setState({
        cards: initializeDeck(this.state.category, this.state.level)
      });
    }
    this.preloadImages()
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
      localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  preloadImages = () => {
    this.state.cards.map(card => {
      const src = `/img/${this.state.category}/${card.type}`
      new Image().src = src
    })
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  settingsHandler = () => {
    this.setState({
      settingsOpen: true
    })
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  statOpenHandler = () => {
    this.setState({
      statOpen: true
    })
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  hotkeysHandler = () => {
    this.setState({
      hotkeysOpen: true
    })
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  autoPlayHandler = () => {
    console.log('auto play')
  }

  handleClick = (id) => {
    // const audio = document.querySelector('#sound');
    // audio.currentTime = 0;
    // audio.play();
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
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  sameCardClicked = (id) => {
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
    this.setState({disabled: false})
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
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  changeLevel =(val, e) => {
    const newArr = [...this.state.activeBtns]
    newArr[0] = e.target.innerText
    this.setState({
      level: val,
      activeBtns: newArr,
      movesLeft: val*4
    })
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
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
    console.log(val)
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

  render() {
    return (
      <div className='wrapper'>
        <Settings
          isOpen={this.state.settingsOpen}
          onClose={() => {this.setState({settingsOpen: false}), this.startNewGame(), localStorage.setItem("chrisGame", JSON.stringify(this.state));}}
          activeBtns={this.state.activeBtns}
          onChangeLevel = {this.changeLevel}
          onChangeCategory ={this.changeCategory}
          onChangeDifficulty={this.changeDifficulty}
        />
        <Statistics
          isOpen={this.state.statOpen}
          onClose={() => {this.setState({statOpen: false}), localStorage.setItem("chrisGame", JSON.stringify(this.state))}}
        />
        <Hotkeys
          isOpen={this.state.hotkeysOpen}
          onClose={() => {this.setState({hotkeysOpen: false}), localStorage.setItem("chrisGame", JSON.stringify(this.state))}}
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
            width={this.state.dimension / this.state.level * 0.9}
            flipped={this.state.flipped}
            handleClick={this.handleClick}
            disabled={this.state.disabled}
            solved={this.state.solved}
            category={this.state.category}
            handleFullScreen={this.fullscreenToggle}
          />
          <Options
            newGameClick={this.startNewGame}
            settingsClick={this.settingsHandler}
            statClick={this.statOpenHandler}
            hotkeysClick={this.hotkeysHandler}
            autoPlayClick={this.autoPlayHandler}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;