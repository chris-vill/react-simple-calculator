import React, { useState } from 'react';
import classes from './Calculator.styl';

import { Button, Display } from '../';

const Calculator = ({ onClick, text }) => {

  const [ expression, setExpression ] = useState('100+20%');
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
      <Button onClick={ compute } text="="/>
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
  function compute() {
    iterate(
      expression.match(/(([0-9]+\.*[0-9]*)|[+\-÷x\^%])/g)
    );

    function iterate(terms) {
      console.log(terms);

      const acc = [];
      const operators = whichOperators(terms);

      console.log(operators);

      while(terms.length) {
        const term = terms.splice(0, 1)[0];

        if (operators.includes(term)) {
          if (term === '%') {
            const additionalTerms = expand(
              acc.pop(),
              acc[ acc.length - 2 ]
            );

            acc.push(...additionalTerms);

          } else {
            acc.push(
              operate(
                term,
                acc.pop(),
                terms.splice(0, 1)[0]
              )
            );
          }

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
        ? iterate(acc)
        : setExpression(acc[0]);
    }

    function operate(operator, left, right) {
      const num1 = Number(left);
      const num2 = Number(right);

      switch(operator) {
        case '^':
          return Math.pow(num1, num2);

        case 'x':
          return num1 * num2;

        case '÷':
          return num1 / num2;

        case '+':
          return num1 + num2;

        case '-':
          return num1 - num2;
      }
    }

    function expand(percent, base) {
      return [
        base,
        'x',
        percent / 100
      ]
    }

    function whichOperators(exp) {
      return exp.includes('^') ? ['^']
        : exp.includes('%') ? ['%']
        : exp.includes('x') || exp.includes('÷') ? ['x', '÷']
        : ['+', '-'];
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
