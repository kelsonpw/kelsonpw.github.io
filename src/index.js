import * as React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App/App';
import typography from './typography';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactGA.initialize('UA-136843165-1');
ReactGA.pageview(window.location.pathname + window.location.search);
typography.injectStyles();

ReactDOM.render(<App />, document.getElementById('root'));
