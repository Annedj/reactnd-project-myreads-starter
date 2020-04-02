import React from 'react';
import PropTypes from 'prop-types';
import MoveBookButton from './MoveBookButton';

function Book(props) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
          <MoveBookButton
            moveShelf={props.moveShelf}
            currentShelf={props.book.shelf}
          />
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors.join(' & ')}</div>
      </div>
    </li>
  )
};

Book.proptypes = {
  book: PropTypes.object.isRequired,
  moveShelf: PropTypes.func.isRequired
};

export default Book;
