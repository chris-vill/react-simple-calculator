import React from 'react';
import ReactDom from 'react-dom';
import './main.styl';

import { Calculator } from './components';

ReactDom.render(
  <Calculator/>,
  document.querySelector('#root')
);
