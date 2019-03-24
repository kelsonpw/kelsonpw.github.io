import * as React from 'react';

import warbler from './warbler2.png';
import shareshot from './shareshot2.png';
import airhead from './airhead.png';
import yahtzee from './yahtzee2.png';
import './Works.scss';

function Works() {
  return (
    <div className="Works">
      <div className="Airhead">
        <a name="works" />
        <img
          className="Airhead__image"
          src={airhead}
          alt="Warbler, a twitter clone project"
        />
        <div className="Airhead__info">
          <p className="Airhead__description">
            <strong>Airhead</strong>, a working slack clone built entirely with{' '}
            <i>React Hooks</i> and <i>Firebase</i>.{' '}
            <small>
              &nbsp; Type @bot to chat to Bender. He's a chat bot hosted on a
              lambda function!
            </small>
          </p>
          <div className="Airhead__links">
            <a className="Airhead__link">github</a>|
            <a className="Airhead__link">site</a>
          </div>
        </div>
      </div>

      <div className="Shareshot">
        <div className="Shareshot__info">
          <p className="Shareshot__description">
            <strong>Shareshot</strong>, a modern image sharing app built with
            VueJS, GraphQL, Apollo, and Express
          </p>
          <div className="Shareshot__links">
            <a className="Shareshot__link">github</a>|
            <a className="Shareshot__link">site</a>
          </div>
        </div>
        <img
          className="Shareshot__image"
          src={shareshot}
          alt="Warbler, a twitter clone project"
        />
      </div>
      <div className="Warbler">
        <img
          className="Warbler__image"
          src={warbler}
          alt="Warbler, a twitter clone project"
        />
        <div className="Warbler__info">
          <p className="Warbler__description">
            <strong>Warbler</strong>, a twitter clone built with{' '}
            <i>Python (flask)</i>
          </p>
          <div className="Warbler__links">
            <a className="Warbler__link">github</a>|
            <a className="Warbler__link">site</a>
          </div>
        </div>
      </div>

      <div className="Yahtzee">
        <div className="Yahtzee__info">
          <p className="Yahtzee__description">
            <strong>Yahtzee</strong>, the original game, built in React
            utilizing OOP principles.
          </p>
          <a className="Yahtzee__link">github</a>|
          <a className="Yahtzee__link">site</a>
        </div>
        <img
          className="Yahtzee__image"
          src={yahtzee}
          alt="Warbler, a twitter clone project"
        />
      </div>
    </div>
  );
}

export default Works;
