import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MoveBookButton extends Component {
  changeShelf = ()

  render() {
    return(
      <div className="book-shelf-changer">
        <select>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  };
};

MoveBookButton.proptypes = {
  book: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired,
  moveShelf: PropTypes.func.isRequired
};

export default MoveBookButton;
