import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom2.css';
import "./css/style.css";
import App from "./components/App";
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Black Ops One', 'Rye']
  }
});

ReactDOM.render(<App />, document.querySelector("#root"));

