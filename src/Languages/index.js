import * as React from 'react';
import { ButtonGroup, ListGroup, ListGroupItem } from 'reactstrap';

import './languages.scss';
import ReactGA from 'react-ga';

const frontEnd = [
  'React',
  'React Native',
  'Redux',
  'Redux Saga',
  'Mobx',
  'VueJS',
  'Styled Components',
  'jQuery',
];

const backEnd = [
  'NodeJS',
  'Express',
  'Koa',
  'Rails',
  'Laravel',
  'Firebase',
  'MySQL/PostgreSQL',
  'MongoDB',
];

const misc = [
  'Git source control',
  'Jira/Confluence',
  'FluidUI',
  'Sketch',
  'Salesforce',
  'MLab',
  'Amazon Web Services',
  'Heroku',
];

function Languages() {
  const [techBio, setTechBio] = React.useState(frontEnd);
  return (
    <div className="Languages">
      <h4 className="Languages__header">Some of the technologies I use</h4>
      <ListGroup className="Languages__list">
        {techBio.map((item, i) => (
          <ListGroupItem key={i}>{item}</ListGroupItem>
        ))}
      </ListGroup>
      <ButtonGroup className="Languages__buttons">
        <button
          className="Languages__button first"
          disabled={techBio === frontEnd}
          onClick={() => {
            ReactGA.event({
              category: 'User',
              action: 'Show front end',
            });
            setTechBio(frontEnd);
          }}>
          Front End
        </button>
        <button
          className="Languages__button"
          disabled={techBio === backEnd}
          onClick={() => {
            ReactGA.event({
              category: 'User',
              action: 'Show back end',
            });
            setTechBio(backEnd);
          }}>
          Back End
        </button>
        <button
          className="Languages__button last"
          disabled={techBio === misc}
          onClick={() => {
            ReactGA.event({
              category: 'User',
              action: 'Show misc',
            });
            setTechBio(misc);
          }}>
          Miscellaneous
        </button>
      </ButtonGroup>
    </div>
  );
}

export default Languages;
