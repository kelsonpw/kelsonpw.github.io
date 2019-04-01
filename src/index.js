import * as React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App/Loadable';
import typography from './utils/typography';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactGA.initialize('UA-136843165-1');
ReactGA.pageview(
  '/portfolo' + window.location.pathname + window.location.search
);
typography.injectStyles();

ReactDOM.render(<App />, document.getElementById('root'));
