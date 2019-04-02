import * as React from 'react';
import yahtzee from '../stuff/yahtzee.png';

function Yahtzee() {
  return (
    <div className="Yahtzee">
      <div className="Yahtzee__info">
        <p className="Yahtzee__description">
          <strong>Yahtzee</strong>, the original game, built in React utilizing
          OOP principles.
        </p>
        <a
          className="Yahtzee__link"
          href="https://github.com/kelsonpw/React-Yahtzee">
          github link
        </a>
        |
        <a
          className="Yahtzee__link"
          href="http://thekelsonwarner.com/React-Yahtzee">
          site link
        </a>
      </div>
      <img className="Yahtzee__image" src={yahtzee} alt="Yahtzee game" />
      <div className="yahtzee_filler" />
    </div>
  );
}

export default Yahtzee;
