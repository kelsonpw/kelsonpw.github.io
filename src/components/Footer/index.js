import * as React from 'react';
import './footer.scss';

function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__left" />
      <div flush="true" className="Footer__right">
        <small className="Footer__item">Designed by Kelson Warner</small>
        <small className="Footer__item">2019</small>
        <small className="Footer__item">
          code for this site can be found{' '}
          <a
            className="Footer__link"
            href="https://github.com/kelsonpw/kelsonpw.github.io">
            here
          </a>
        </small>
      </div>
    </div>
  );
}

export default Footer;
