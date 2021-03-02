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
    dimension: storageInfo ? storageInfo['dimension'] : widthInitial,
    disabled: storageInfo ? storageInfo['disabled'] : false,
    level: storageInfo ? storageInfo['level'] : 4,
    category: storageInfo ? storageInfo['category'] : 'clothes',
    moves: storageInfo ? storageInfo['moves'] : 0,
    activeBtns: storageInfo ? storageInfo['activeBtns'] : ['4×4', 'Clothes', 'Unlimited Moves'],
    movesLeft: storageInfo ? storageInfo['movesLeft'] : 16,
    limitedMoves: storageInfo ? storageInfo['limitedMoves'] : false,
    fullscreen: storageInfo ? storageInfo['fullscreen'] : false,
    local: true,
    pause: false
  }

  componentDidMount() {
    if(this.state.cards.length === 0) {
      this.setState({
        cards: initializeDeck(this.state.category, this.state.level)
      });
    }
    this.preloadImages()
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
    console.log(this.state)
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

  settingsOpenHandler = () => {
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

  hotkeysOpenHandler = () => {
    this.setState({
      hotkeysOpen: true
    })
    localStorage.setItem("chrisGame", JSON.stringify(this.state));
  }

  play2 = () => {

  }

  autoPlayHandler = () => {
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
        }, 1000 + (3000 * ind));
      })(i);
     
      if ( this.state.solved.length !== length ) {
        console.log(15)
      }
    // if ( this.state.solved.length !== length ) {
    //   let unsolvedCards = [];
    //   for (let j = 0; j < length; j++) {
    //     if(!this.state.solved.includes(targetCards[j].id)) {
    //       unsolvedCards.push(j)
    //     }
    //   }
    //   let sortUnsolvedCardsOnes = [unsolvedCards[0]];
    //   for (let m = 1; m < unsolvedCards; m++) {
    //     const type = cards[unsolvedCards[0]].type
    //     if(cards[unsolvedCards[m]].type === type) {
    //       sortUnsolvedCardsOnes.push(unsolvedCards[m])
    //     }
    //     unsolvedCards.splice(m,1)
    //     unsolvedCards = unsolvedCards.slice(1)
    //     if (unsolvedCards.length !== 0) {
    //       sortUnsolvedCardsOnes.push(unsolvedCards[0])
    //       m = 1
    //     }
    //     // m++
    //     // if(m < unsolvedCards) {
    //     //   unsolvedCards = unsolvedCards.slice(1)
    //     //   unsolvedCards
    //     // }
    //   }

      // console.log(sortUnsolvedCardsOnes)
    }
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
      console.log(results)
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
    const newObj = JSON.parse(JSON.stringify(this.state))
    newObj.settingsOpen = false
    this.setState({settingsOpen: false})
    this.startNewGame()
    localStorage.setItem("chrisGame", JSON.stringify(newObj))
  }

  statHandler = () => {
    const newObj = JSON.parse(JSON.stringify(this.state))
    newObj.statOpen = false
    this.setState({statOpen: false})
    localStorage.setItem("chrisGame", JSON.stringify(newObj))
  }

  hotkeysHandler =() => {
    const newObj = JSON.parse(JSON.stringify(this.state))
    newObj.hotkeysOpen = false
    this.setState({hotkeysOpen: false}),
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
        <Settings
          isOpen={this.state.settingsOpen}
          onClose={this.settingsHandler}
          activeBtns={this.state.activeBtns}
          onChangeLevel = {this.changeLevel}
          onChangeCategory ={this.changeCategory}
          onChangeDifficulty={this.changeDifficulty}
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
            settingsClick={this.settingsOpenHandler}
            statClick={this.statOpenHandler}
            hotkeysClick={this.hotkeysOpenHandler}
            autoPlayClick={this.autoPlayHandler}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;