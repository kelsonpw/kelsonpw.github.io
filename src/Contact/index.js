import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import './contact.scss';

function Contact() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const sendEmail = () => {
    const msg = {
      name,
      email,
      message,
    };
  };

  return (
    <div className="Contact">
      <h4>Let's get in touch!</h4>
      <div className="Contact__body">
        <div className="Contact_message">
          <strong>Shoot Me A Message</strong>
          <Form className="Contact__form">
            <FormGroup className="Contact__form__group">
              <Label for="yourName">Your name:</Label>
              <Input
                type="text"
                name="name"
                id="yourName"
                onChange={evt => setName(evt.target.value)}
              />
            </FormGroup>
            <FormGroup className="Contact__form__group">
              <Label for="yourEmail">Your email:</Label>
              <Input
                type="email"
                name="email"
                id="yourEmail"
                onChange={evt => setEmail(evt.target.value)}
              />
            </FormGroup>
            <FormGroup className="Contact__form__group">
              <Label for="yourMsg">Your message:</Label>
              <Input
                type="textarea"
                name="message"
                id="yourMessage"
                onChange={evt => setMessage(evt.target.value)}
              />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
        <div className="Contact__info">
          <strong>Contact Info</strong>
          <ul className="Contact__info__list">
            <li className="Contact_info__item" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
