import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import Note from './Note';

const cookie_key = 'NOTES';

class App extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      notes: []
    };
  }

  componentDidMount() {
    this.setState({ notes: read_cookie(cookie_key) });
  }

  submit = (e) => {
    e.preventDefault();
    const { notes, text } = this.state;
    this.setState({
      notes: [{ text }, ...notes],
      text: ''
    }, () => this.bakeCookie());
  }

  bakeCookie = () => {
    const { notes } = this.state;
    bake_cookie(cookie_key, notes);
  };

  clearNotes = () => {
    delete_cookie(cookie_key);
    this.setState({ notes: [] });
  }

  render() {
    const { notes, text } = this.state;
    return (
      <div>
        <h2>Note to Self</h2>
        <Form inline onSubmit={this.submit} className="form">
          <FormControl
            onChange={(event) => this.setState({ text: event.target.value })}
            value={text}
            style={{ marginRight: '5px' }}
          />
          <Button type="submit">Submit</Button>
        </Form>
        {notes.map((note, index) => (
          <Note key={index} note={note} />
        ))}
        <hr />
        <Button onClick={this.clearNotes}>Clear Notes</Button>
      </div>
    );
  }
}

export default App;
