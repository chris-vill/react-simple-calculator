import React, { useState } from 'react';
import classes from './Calculator.styl';

import { Button, Display } from '../';

const Calculator = ({ onClick, text }) => {

  // const [ expression, setExpression ] = useState('5+(10+(2+1))');
  const [ expression, setExpression ] = useState('');
  const [ isParensOpen, toggleParens ] = useState(false);
  const [ isSuperscript, toggleSuperscript ] = useState(false);

  return (
    <div className={ classes['calc-body'] }>

      {/* 1st row */}
      <Display
        extClasses={ classes['calc-screen'] }
        onChange={ setExpression }
        value={ expression }
      />

      {/* 2nd row */}
      <Button onClick={ clear } text="C"/>
      <Button onClick={ insertParenthesis } text="()"/>
      <Button onClick={ appendText } text="%"/>
      <Button onClick={ exponent } text="xʸ"/>

      {/* 3rd row */}
      <Button onClick={ appendText } text="7"/>
      <Button onClick={ appendText } text="8"/>
      <Button onClick={ appendText } text="9"/>
      <Button onClick={ appendText } text="÷"/>

      {/* 4th row */}
      <Button onClick={ appendText } text="4"/>
      <Button onClick={ appendText } text="5"/>
      <Button onClick={ appendText } text="6"/>
      <Button onClick={ appendText } text="x"/>

      {/* 5th row */}
      <Button onClick={ appendText } text="1"/>
      <Button onClick={ appendText } text="2"/>
      <Button onClick={ appendText } text="3"/>
      <Button onClick={ appendText } text="-"/>

      {/* 6th row */}
      <Button onClick={ appendText } text="0"/>
      <Button onClick={ appendText } text="."/>
      <Button onClick={ calculate } text="="/>
      <Button onClick={ appendText } text="+"/>
    </div>
  );

  /*
    -> 3 + 2 x 2
    -> [ 3, +, 2, x, 2 ]
    -> [ 3, + 4 ]
    -> [ 7 ]

    -> 100 + 20%
    -> 100 + 100 * 0.2
  */
  function calculate() {
    // const expressionRegex = /((\(.+\)|[0-9]+\.*[0-9]*)|[+\-÷x\^%])/g;
    const expressionRegex = /(([0-9]+\.*[0-9]*)|[+\-÷x\^%])/g;
    const terms = expression
      .match(expressionRegex)
      .map(term => {
        const num = Number(term);

        return isNaN(num) ? term : num
      });

    iterate(terms);

    function iterate(terms) {
      const acc = [];

      while(terms.length) {
        let answer = compute(terms.splice(0, 1)[0], terms, acc);
        acc.push(answer);
      }

      acc.length > 1
        ? iterate(acc)
        : setExpression(acc[0]);
    }

    function compute(term, terms, acc) {
      const operators = ['^', '%', 'x', '÷', '+', '-'];

      if (!operators.includes(term)) {
        return term;
      }

      const num1 = acc.pop();
      const num2 = term === '%'
        ? acc[ acc.length - 2 ]
        : terms.splice(0, 1)[0];

      switch(term) {
        case '^':
          return [ Math.pow(num1, num2) ];

        case '%':
          return [ num2, 'x', num1 / 100 ];

        case 'x':
          return [ num1 * num2 ];

        case '÷':
          return [ num1 / num2 ];

        case '+':
          return [ num1 + num2 ];

        case '-':
          return [ num1 - num2 ];
      }
    }
  }

  function clear() {
    setExpression('');
  }

  function exponent() {
    setExpression(expression + '^');
    toggleSuperscript(!isSuperscript);
  }

  function insertParenthesis() {
    let parens = isParensOpen
      ? ')'
      : '(';

    setExpression(expression + parens);
    toggleParens(!isParensOpen);
  }

  function appendText(e, text) {
    setExpression(expression + text);
    isSuperscript && toggleSuperscript(!isSuperscript);
  }

  function prependText(e, text) {
    setExpression(text + expression);
  }
}

export default Calculator;
