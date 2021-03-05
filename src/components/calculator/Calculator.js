import React, { useState } from 'react';
import classes from './Calculator.styl';

import { Button, Input } from '../';

const Calculator = ({ onClick, text }) => {

  const [ expression, setExpression ] = useState('');
  const [ isParensOpen, toggleParens ] = useState(false);

  return (
    <div className={ classes['calc-body'] }>

      {/* 1st row */}
      <Input extClasses={ classes['calc-screen'] } onChange={ setExpression } value={ expression }/>

      {/* 2nd row */}
      <Button onClick={ clear } text="C"/>
      <Button onClick={ insertParenthesis } text="()"/>
      <Button onClick={ appendText } text="%"/>
      <Button onClick={ appendText } text="÷"/>

      {/* 3rd row */}
      <Button onClick={ appendText } text="7"/>
      <Button onClick={ appendText } text="8"/>
      <Button onClick={ appendText } text="9"/>
      <Button onClick={ appendText } text="x"/>

      {/* 4th row */}
      <Button onClick={ appendText } text="4"/>
      <Button onClick={ appendText } text="5"/>
      <Button onClick={ appendText } text="6"/>
      <Button onClick={ appendText } text="-"/>

      {/* 5th row */}
      <Button onClick={ appendText } text="1"/>
      <Button onClick={ appendText } text="2"/>
      <Button onClick={ appendText } text="3"/>
      <Button onClick={ appendText } text="+"/>

      {/* 6th row */}
      <Button onClick={ prependText } text="+/-"/>
      <Button onClick={ appendText } text="0"/>
      <Button onClick={ appendText } text="."/>
      <Button onClick={ compute } text="="/>
    </div>
  );

  /*
    -> 3 + 2 x 2
    -> [ 3, +, 2, x, 2 ]
    -> [ 3, + 4 ]
    -> [ 7 ]
  */
  function compute() {
    iterate(
      ['x', '÷'],
      expression.match(/(([0-9]+\.*[0-9]*)|[+\-÷x])/g)
    );

    function iterate(operators, terms) {
      const acc = [];

      while(terms.length) {
        const term = terms.splice(0, 1)[0];

        if (operators.includes(term)) {
          acc.push(
            operate(
              term,
              acc.pop(),
              terms.splice(0, 1)[0]
            )
          );

        } else {
          const num = Number(term);

          acc.push(
            isNaN(num)
              ? term
              : Number(term)
          );
        }
      }

      acc.length > 1
        ? iterate(['+', '-'], acc)
        : setExpression(acc[0]);
    }

    function operate(operator, left, right) {
      const num1 = Number(left);
      const num2 = Number(right);

      switch(operator) {
        case 'x':
          return num1 * num2;

        case '÷':
          return num1 / num2;

        case '+':
          return num1 + num2;

        case '-':
          return num1 + num3;
      }
    }
  }

  function clear() {
    setExpression('');
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
  }

  function prependText(e, text) {
    setExpression(text + expression);
  }
}

export default Calculator;
