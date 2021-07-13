import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App.js';
import Backend from './dataBase.js';


ReactDOM.render(
    <div>
        <Backend />
        <App />
    </div>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/*
 2cff00 g
 ff0000 r
 fbff00 y
 */