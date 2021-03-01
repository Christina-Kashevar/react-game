import React from 'react';
import './OkButton.scss';

const OkButton = ({onclick}) => (
    <button className="save" onClick={onclick} >OK</button>
)

export default OkButton;