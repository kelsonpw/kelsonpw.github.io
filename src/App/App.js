import * as React from 'react';
import Nav from '../Nav';
import Info from '../Info';
import Works from '../Works';
import Bio from '../Bio';
import Contact from '../Contact';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Nav />
      <Info />
      <Works />
      <Bio />
      <Contact />
    </div>
  );
}

export default App;
