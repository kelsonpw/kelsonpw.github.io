import * as React from 'react';

import warbler from './warbler.png';
import shareshot from './shareshot.png';
import airhead from './airhead.png';
import './Works.scss';

function Works() {
  return (
    <div className="Works">
      <div className="Warbler">
        <img
          className="Warbler__image"
          src={airhead}
          alt="Warbler, a twitter clone project"
        />
        <div className="Warbler__info">
          <p className="Warbler__description">
            Airhead, a working slack clone built entirely with{' '}
            <i>React Hooks</i> and <i>Firebase</i>.{' '}
            <small>
              &nbsp; Type @bot to chat to Bender. He's a chat bot hosted on a
              lambda function!
            </small>
          </p>
          <div className="Warbler__links">
            <a className="Warbler__link">github</a>|
            <a className="Warbler__link">site</a>
          </div>
        </div>
      </div>

      <div className="Shareshot">
        <div className="Shareshot__info">
          <p className="Sharehot__description">
            Shareshot, a modern image sharing app built with VueJS, GraphQL,
            Apollo, and Express
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
            Warbler, a twitter clone built with <i>Python (flask)</i>
          </p>
          <div className="Warbler__links">
            <a className="Warbler__link">github</a>|
            <a className="Warbler__link">site</a>
          </div>
        </div>
      </div>

      <div className="Shareshot">
        <div className="Shareshot__info">
          <p className="Sharehot__description">
            Shareshot, a modern image sharing app built with VueJS, GraphQL,
            Apollo, and Express
          </p>
          <a className="Shareshot__link">github</a>|
          <a className="Shareshot__link">site</a>
        </div>
        <img
          className="Shareshot__image"
          src={shareshot}
          alt="Warbler, a twitter clone project"
        />
      </div>
    </div>
  );
}

export default Works;
