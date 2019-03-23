import * as React from 'react';
import './nav.scss';

function Nav() {
  return (
    <header className="Header">
      <div className="Header__left">
        <div className="Header__row">
          <div className="Header__link">
            <p>WORKS</p>
          </div>
        </div>
        <div className="Header__row">
          <div className="Header__link">
            <p>ABOUT</p>
          </div>
        </div>
      </div>
      <div className="Header__center">
        <div className="Header__pic" />
      </div>
      <div className="Header__right">
        <div className="Header__row">
          <div className="Header__link">
            <p>LINKS</p>
          </div>
        </div>
        <div className="Header__row">
          <div className="Header__link">
            <p>CONTACTS</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
