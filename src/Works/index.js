import * as React from 'react';
import warbler from './warbler.png';

import './Works.scss';

function Works() {
  return (
    <div className="Works">
      <img
        className="warbler-a"
        src={warbler}
        alt="Warbler, a twitter clone project"
      />
      <img
        className="warbler-b"
        src={warbler}
        alt="Warbler, a twitter clone project"
      />
      <img
        className="warbler-a"
        src={warbler}
        alt="Warbler, a twitter clone project"
      />
      <img
        className="warbler-b"
        src={warbler}
        alt="Warbler, a twitter clone project"
      />
    </div>
  );
}

export default Works;
