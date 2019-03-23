import * as React from 'react';
import Nav from '../Nav';
import Info from '../Info';
import Works from '../Works';
import Bio from '../Bio';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Nav />
      <Info />
      <Works />
      <Bio />
    </div>
  );
}

export default App;
