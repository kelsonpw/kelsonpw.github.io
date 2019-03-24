import * as React from 'react';
import { FaAngellist } from 'react-icons/fa';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

import './Info.scss';

function Info() {
  return (
    <div className="Info">
      <h1 className="Info__name">Kelson Warner</h1>
      <h3 className="Info__title">Front End Engineer</h3>
      <div className="Info__icons">
        <div />
        <a href="https://github.com/kelsonpw">
          <FiGithub className="Info__icons__icon" />
        </a>
        <a href="https://linkedin.com/in/kelson-warner">
          <FiLinkedin className="Info__icons__icon" />
        </a>
        <a href="https://angel.co/kelsonwarner">
          <FaAngellist className="Info__icons__icon" />
        </a>
        <a href="https://twitter.com/thekelsonwarner">
          <FiTwitter className="Info__icons__icon" />
        </a>
        <div />
      </div>
    </div>
  );
}

export default Info;
