import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MoveBookButton extends Component {
  state = {
    value: this.props.currentShelf
  }

  change = (newShelf) => {
  //  const newShelf = event.target.value;
    this.setState({value: newShelf})
    this.props.moveShelf(newShelf)
  };

  render() {
    return(
      <div className="book-shelf-changer">
        <select onChange={(e) => this.change(e.target.value)} value={this.state.value} >
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
  currentShelf: PropTypes.string,
  moveShelf: PropTypes.func.isRequired
};

export default MoveBookButton;
