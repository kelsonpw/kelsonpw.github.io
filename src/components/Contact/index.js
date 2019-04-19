import * as React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import useEmailFrom from '../../hooks/useEmailForm';
import './contact.scss';

function Contact() {
  const { state, update, sendEmail } = useEmailFrom();
  return (
    <div className="Contact">
      <h4>Let's get in touch!</h4>
      <div className="Contact__body">
        <div className="Contact_message">
          <a name="contacts" id="contacts" href="#contacts" />
          <strong>Shoot Me A Message</strong>
          <Form className="Contact__form">
            <FormGroup className="Contact__form__group">
              <Label for="yourName">Your name:</Label>
              <Input
                type="text"
                name="name"
                id="yourName"
                value={state.name}
                onChange={update}
              />
            </FormGroup>
            <FormGroup className="Contact__form__group">
              <Label for="yourEmail">Your email:</Label>
              <Input
                type="email"
                name="email"
                id="yourEmail"
                value={state.email}
                onChange={update}
              />
            </FormGroup>
            <FormGroup className="Contact__form__group">
              <Label for="yourMsg">Your message:</Label>
              <Input
                type="textarea"
                name="message"
                id="yourMessage"
                value={state.message}
                onChange={update}
              />
            </FormGroup>
            <Button onClick={sendEmail}>Submit</Button>
          </Form>
        </div>
        <div className="Contact__info">
          <strong className="Contact__info__title">Contact Info</strong>
          <ListGroup className="Contact__info__list" flush>
            <ListGroupItem>Kelson Warner</ListGroupItem>
            <ListGroupItem>Oakland, CA 94606</ListGroupItem>
            <ListGroupItem>kelson@null.net</ListGroupItem>
            <ListGroupItem tag="a" href="https://www.github.com/kelsonpw">
              github.com/kelsonpw
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default Contact;
