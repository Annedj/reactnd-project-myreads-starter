import React from 'react';
import PropTypes from 'prop-types';
import MoveBookButton from './MoveBookButton';

function Book(props) {
  const moveBookShelf = (newShelf) => {
    props.moveShelf(props.book.id, newShelf)
  }

  return (
     (<li>
        <div className="book">
          <div className="book-top">
            {props.book.imageLinks && (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>)}
            <MoveBookButton
              moveShelf={moveBookShelf}
              currentShelf={props.book.shelf || 'none'}
            />
          </div>
          <div className="book-title">{props.book.title}</div>
          <div className="book-authors">{props.book.authors && props.book.authors.join(' & ')}</div>
        </div>
      </li>)
  )
};

Book.proptypes = {
  book: PropTypes.object.isRequired,
  moveShelf: PropTypes.func
};

export default Book;
