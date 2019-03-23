import * as React from 'react';
import warbler from './warbler.png';

import './Works.scss';

function Works() {
  return (
    <div className="Works">
      <div>
        <img
          className="warbler-a"
          src={warbler}
          alt="Warbler, a twitter clone project"
        />
      </div>
      <div>
        <img
          className="warbler-c"
          src={warbler}
          alt="Warbler, a twitter clone project"
        />
      </div>
      <div>
        <img
          className="warbler-c"
          src={warbler}
          alt="Warbler, a twitter clone project"
        />
      </div>
      <div>
        <img
          className="warbler-b"
          src={warbler}
          alt="Warbler, a twitter clone project"
        />
      </div>
    </div>
  );
}

export default Works;
