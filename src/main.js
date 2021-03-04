import React from 'react';
import ReactDom from 'react-dom';
import './main.styl';

import Button from './components/button/Button.js';

function justLog() {
  console.log('Hello');
}

ReactDom.render(
  <Button onClick={ justLog } text="Click Me"/>,
  document.querySelector('#root')
);
