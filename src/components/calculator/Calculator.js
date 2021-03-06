import React, { useState } from 'react';
import classes from './Calculator.styl';

import { Button, Display } from '../';

const Calculator = ({ onClick, text }) => {

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
    const expressionRegex = /((\(.+\)|[0-9]+\.*[0-9]*)|[+\-÷x\^%])/g;
    const terms = identifyTerms(expression);
    const finalAnswer = iterate(terms);

    setExpression(finalAnswer);

    function compute(currentTerm, terms, acc) {
      const operators = ['^', '%', 'x', '÷', '+', '-'];

      if (!operators.includes(currentTerm)) {
        return [ currentTerm ];
      }

      const num1 = acc.pop();
      let num2 = currentTerm === '%'
        ? acc[ acc.length - 2 ]
        : terms.splice(0, 1)[0];

      if (Array.isArray(num2)) {
        num2 = iterate(num2);
      }

      switch(currentTerm) {
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

    function iterate(terms) {
      const acc = [];

      while(terms.length) {
        console.log('LOOP')
        const currentTerm = terms.splice(0, 1)[0];
        const answer = Array.isArray(currentTerm)
          ? iterate(currentTerm)
          : compute(currentTerm, terms, acc);

        acc.push(...answer);
      }

      if (acc.length === 1) {
        return acc[0];
      }

      return iterate(acc);
    }

    function identifyTerms(exp) {
      return exp
        .match(expressionRegex)
        .map(term => {
          const num = Number(term);

          if (term.includes('(')) {
            return identifyTerms(
              term.replace(/^\(|\)$/g, '')
            );

          } else if (isNaN(num)) {
            return term;
          }

          return num;
        });
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
