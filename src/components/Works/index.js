import * as React from 'react';

import Airhead from './Airhead';
import Shareshot from './Shareshot';
import Warbler from './Warbler';
import Yahtzee from './Yahtzee';
import './Works.scss';

function Works() {
  return (
    <div className="Works">
      <Airhead />
      <Shareshot />
      <Warbler />
      <Yahtzee />
    </div>
  );
}

export default Works;
