import React from 'react';
import classes from './Display.styl';

const Display = ({ onChange, extClasses, value }) => {

  const regex = /((\(.+\)|[0-9]+\.*[0-9]*)|[+\-÷x%]|\^[0-9]+)/g;
  const values = typeof value === 'string' && (
    value.match(regex) || []
  )
  .map((val, i) => val.includes('^')
    ? <sup key={ i }>{ val.match(/[0-9]+/g)[0] }</sup>
    : val
  );

  return (
    <div
      className={ `${ classes.display } ${ extClasses }` }
      onChange={ onChange }
      type="text"
    >
      { values || value }
    </div>
  );
}

export default Display;
