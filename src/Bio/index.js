import * as React from 'react';

import Languages from '../Languages';
import Experience from '../Experience';
import MyNews from '../MyNews';
import './bio.scss';

function Bio() {
  return (
    <div className="Bio" name="about">
      <div>
        <div className="Bio__about">
          <a name="about" />
          <h4 className="Bio__about__header">A Little About Me</h4>
          <p>
            I am a passionate developer with a hunger for solving problems and
            building things that make an impact on the lives of others. I have
            experience working with React, React Native, Ruby on Rails, Node,
            Express, AWS, Flask, Python, and both relational and non-relational
            databases.
          </p>
          <p>
            From a young age I have been fascinated with technology and
            electronics. Code is a language that just feels natural to me, and
            after picking up web development, I can't seem to get enough of it.
            One of my favorite things is seeing something go from just an idea,
            to being a fully functioning piece of software.
          </p>
          <p>
            I really value being around others who are smart, positive, and
            inquisitive. Some of the best learning and growth I've ever had has
            been from solving a challenging problem with a veteran engineer. I
            want to be constantly learning, and pushing my self to build more
            and more awesome things!
          </p>
        </div>
      </div>
      <div className="Bio__tech">
        <Languages />
      </div>
      <div className="Bio__experience">
        <Experience />
      </div>
      <div className="Bio__resume">
        <MyNews />
      </div>
    </div>
  );
}

export default Bio;
