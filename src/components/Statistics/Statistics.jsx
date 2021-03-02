import React, { Component } from 'react';
import PropTypes from "prop-types";
import Backdrop from '../Backdrop/Backdrop';
import OkButton from '../OkButton/OkButton';
import './Statistics.scss';
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state= {
      cls: ['modal']
    }
  }

  updateLocal = () => {
    if (!this.props.isOpen) {
      this.state.cls.push('close')
    }
    if (localStorage.getItem('chrisResults')) {
      const results = JSON.parse(localStorage.getItem('chrisResults'));
      let table = '<table><tr><th>4×4</th><th>6×6</th></tr>';
      for (let i = 0; i < Math.max(results['4'].length, results['6'].length); i++) {
        const four = results['4'][i] ? `${results['4'][i]} moves` : '';
        const six = results['6'][i] ? `${results['6'][i]} moves` : '';
        table +=
        `<tr><td>${four}</td><td>${six}</td></tr>`;
      }
      table += '</table>';
      document.querySelector('.score').innerHTML = table;
    } else {
      document.querySelector('.score').innerText = 'There is no results';
    }
  }

  componentDidUpdate() {
    this.updateLocal()
  }

 componentDidMount() {
  this.updateLocal()
}

  render() {
    return (
      <>
        {this.props.isOpen && <Backdrop onclick={this.props.onClose}/>}
        <div className={this.props.isOpen ? 'modal' : 'modal close'}>
          <h3>Statistics</h3>
          <div className='score'></div>
          <OkButton onclick={this.props.onClose}/>
        </div>
      </>
    )
  }
}

export default Statistics;

Statistics.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  win: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};