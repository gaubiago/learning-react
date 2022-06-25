// React is after the JSX compilation by Babel 
import React from 'react';
import ReactDOM from 'react-dom/client';

const element = <h1>Hello World</h1>;
console.log(element);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  element
);

