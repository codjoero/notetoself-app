import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Note extends Component {
  render() {
    const { note: { text } } = this.props;
    return (
      <div className="note">
        <p>{text}</p>
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.instanceOf(Object).isRequired,
};

export default Note;
