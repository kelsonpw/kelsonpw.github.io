import * as React from 'react';
import Nav from '../components/Nav';
import Info from '../components/Info';
import Works from '../components/Works';
import Bio from '../components/Bio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Nav />
      <Info />
      <Works />
      <Bio />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
