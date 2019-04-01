import * as React from 'react';
import shareshot from '../stuff/shareshot.png';

function Shareshot() {
  return (
    <div className="Shareshot">
      <div className="Shareshot__info">
        <p className="Shareshot__description">
          <strong>Shareshot</strong>, a modern image sharing app built with
          VueJS, GraphQL, Apollo, and Express
        </p>
        <div className="Shareshot__links">
          <a
            className="Shareshot__link"
            href="https://www.github.com/kelsonpw/shareshot">
            github link
          </a>
        </div>
      </div>
      <img
        className="Shareshot__image"
        src={shareshot}
        alt="Shareshot, a web app"
      />
      <div className="filler" />
    </div>
  );
}

export default Shareshot;
