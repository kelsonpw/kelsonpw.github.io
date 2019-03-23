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
        <FiGithub className="Info__icons__icon" />
        <FiLinkedin className="Info__icons__icon" />
        <FaAngellist className="Info__icons__icon" />
        <FiTwitter className="Info__icons__icon" />
        <div />
      </div>
    </div>
  );
}

export default Info;
