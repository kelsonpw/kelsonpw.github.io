import * as React from 'react';
import './nav.scss';

function Nav() {
  return (
    <header className="Header">
      <div className="Header__left">
        <div className="Header__row">
          <div className="Header__link">
            <a href="#works" className="Header__nav__link">
              WORKS
            </a>
          </div>
        </div>
        <div className="Header__row">
          <div className="Header__link">
            <a href="#about" className="Header__nav__link">
              ABOUT
            </a>
          </div>
        </div>
      </div>
      <div className="Header__center">
        <div className="Header__pic" />
      </div>
      <div className="Header__right">
        <div className="Header__row">
          <div className="Header__link">
            <a href="#links" className="Header__nav__link">
              LINKS
            </a>
          </div>
        </div>
        <div className="Header__row">
          <div className="Header__link">
            <a href="#contacts" className="Header__nav__link">
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
