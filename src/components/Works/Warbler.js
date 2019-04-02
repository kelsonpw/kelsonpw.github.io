import * as React from 'react';
import warbler from '../stuff/warbler.png';

function Warbler() {
  return (
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
          <a
            className="Warbler__link"
            href="https://github.com/kelsonpw/WarblerV2">
            github link
          </a>
          |
          <a className="Warbler__link" href="https://warbler-v2.herokuapp.com/">
            site link
          </a>
        </div>
      </div>
    </div>
  );
}

export default Warbler;
