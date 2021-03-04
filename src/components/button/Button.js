import React from 'react';
import classes from './Button.styl';

const Button = ({ onClick, text }) => {

  console.log(classes);

  return (
    <button className={ classes.button } onClick={ onClick }>{ text }</button>
  );
}

export default Button;
