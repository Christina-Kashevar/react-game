import React, { Component } from 'react';
import Button from '../Button/Button';
import './Options.scss';


class Options extends Component {
  constructor(props) {
    super(props)
  }

  newGameHandler = () => {
    console.log(5)
  }

  render (){
    return (
      <div className='options'>
        <h1>Memory Game</h1>
        <div className='btns'>
          <Button
            onClick={this.props.newGameClick}
            text='NEW GAME'
            disabled={this.props.disabled}
          />
          <Button
            onClick={this.props.settingsClick}
            text='SETTINGS'
            disabled={this.props.disabled}
          />
          <Button
            onClick={this.props.statClick}
            text='STATISTICS'
          />
          <Button
            onClick={this.props.hotkeysClick}
            text='HOT KEYS LIST'
          />
          <Button
            onClick={this.props.autoPlayClick}
            text='AUTOPLAY'
          />
        </div>
      </div>
    )
  }
}

export default Options;