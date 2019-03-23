import * as React from 'react';

import Languages from '../Languages';
import './bio.css';

function Bio() {
  return (
    <div className="Bio">
      <div className="Bio__about">
        <h4>A Little About Me</h4>
        <p>
          {`
I am a passionate developer with a hunger for solving problems and building things that make an impact on the lives of others. I have experience working with React, React Native, Ruby on Rails, Node, Express, AWS, Flask, Python, and both relational and non-relational databases.

From a young age I have been fascinated with technology and electronics. Code is a language that just feels natural to me, and after picking up web development, I can't seem to get enough of it. One of my favorite things is seeing something go from just an idea, to being a fully functioning piece of software.

I enjoy working with other goal oriented, passionate, creative and hard-working engineers. Currently I am looking to join a team and continue building a strong foundation in developing software. I am so excited to take the next step in my career and be involved in the process of creating something brilliant!
            `}
        </p>
      </div>
      <div className="Bio__tech">
        <Languages />
      </div>
      <div className="Bio__experience">
        <h4>A Little About Me</h4>
        <p>
          {`
I enjoy working with other goal oriented, passionate, creative and hard-working engineers. Currently I am looking to join a team and continue building a strong foundation in developing software. I am so excited to take the next step in my career and be involved in the process of creating something brilliant!
            `}
        </p>
      </div>
      <div className="Bio__resume">
        <h4>A Little About Me</h4>
        <p>
          {`
I am a passionate developer with a hunger for solving problems and building things that make an impact on the lives of others. I have experience working with React, React Native, Ruby on Rails, Node, Express, AWS, Flask, Python, and both relational and non-relational databases.

From a young age I have been fascinated with technology and electronics. Code is a language that just feels natural to me, and after picking up web development, I can't seem to get enough of it. One of my favorite things is seeing something go from just an idea, to being a fully functioning piece of software.

I enjoy working with other goal oriented, passionate, creative and hard-working engineers. Currently I am looking to join a team and continue building a strong foundation in developing software. I am so excited to take the next step in my career and be involved in the process of creating something brilliant!
            `}
        </p>
      </div>
    </div>
  );
}

export default Bio;
