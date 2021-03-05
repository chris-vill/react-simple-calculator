import React from 'react';
import classes from './Button.styl';

const Button = ({ onClick, text, extClasses }) => {

  return (
    <button
      className={ extClasses }
      onClick={ _onClick }
      value={ text }
    >
      { text }
    </button>
  );

  function _onClick(e) {
    onClick(e, text);
  }
}

export default Button;
