import * as React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

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
    <React.Fragment>
      <h4>Some of the technology I use</h4>
      <ul>
        {techBio.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <ButtonGroup>
        <Button
          disabled={techBio === frontEnd}
          onClick={() => setTechBio(frontEnd)}>
          Front End
        </Button>
        <Button
          disabled={techBio === backEnd}
          onClick={() => setTechBio(backEnd)}>
          Back End
        </Button>
        <Button disabled={techBio === misc} onClick={() => setTechBio(misc)}>
          Miscellaneous
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
}

export default Languages;
