import * as React from 'react';
import airhead from '../stuff/airhead.png';

function Airhead() {
  return (
    <div className="Airhead">
      <a name="works" id="works" href="#works">
        works
      </a>
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
            &nbsp; Users can type @bot to chat to Bender. He's a chat bot hosted
            on a lambda function!
          </small>
        </p>
        <div className="Airhead__links">
          <a
            className="Airhead__link"
            href="https://www.github.com/kelsonpw/chatapp">
            github link
          </a>
          |
          <a
            className="Airhead__link"
            href="https://airheadio.firebaseapp.com/">
            site link
          </a>
        </div>
      </div>
    </div>
  );
}

export default Airhead;
