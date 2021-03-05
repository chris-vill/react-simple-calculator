import React from 'react';
import classes from './Input.styl';

const Input = ({ onChange, text, extClasses, value }) => {

  return (
    <input
      className={ extClasses }
      onChange={ onChange }
      type="text"
      value={ value }
    />
  );
}

export default Input;
