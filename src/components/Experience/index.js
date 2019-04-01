import * as React from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';

import './experience.scss';

function Experience() {
  return (
    <div className="Experience">
      <h4 className="Experience__header">Recent Experience</h4>
      <ListGroup className="Experience__list">
        <ListGroupItem active>
          <ListGroupItemHeading>Software Engineer</ListGroupItemHeading>
          <ListGroupItemText>DMI Software Inc</ListGroupItemText>
          <ListGroupItemText>10/2018 - Present</ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>
            Full Stack Engineer (Contract)
          </ListGroupItemHeading>
          <ListGroupItemText>Tunelark</ListGroupItemText>
          <ListGroupItemText>5/2018 - 9/2018</ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>Operations Manager</ListGroupItemHeading>
          <ListGroupItemText>Cirrus LED Systems Inc.</ListGroupItemText>
          <ListGroupItemText>10/2016 - 12/2017</ListGroupItemText>
        </ListGroupItem>
        <ListGroupItem>
          <ListGroupItemHeading>Head of eCommerce</ListGroupItemHeading>
          <ListGroupItemText>
            BBA Solutions - UC Berkeley Bookstore
          </ListGroupItemText>
          <ListGroupItemText>5/2014 - 10/2016</ListGroupItemText>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

export default Experience;
