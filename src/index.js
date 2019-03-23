import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import typography from './typography';

typography.injectStyles();

ReactDOM.render(<App />, document.getElementById('root'));
