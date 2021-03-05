import React from 'react';
import ReactDom from 'react-dom';

export default function RDRender(WrappedComponent, appendTo) {
  ReactDom.render(
    WrappedComponent,
    appendTo
      ? document.querySelector(appendTo)
      : document.getElementById('root')
  );
}
