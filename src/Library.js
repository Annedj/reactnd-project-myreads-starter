import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

const shelves = ['Currently Reading', 'Want to Read', 'Read'];

class Library extends Component {
  formatShelfName = (name) => name.toLowerCase().replace(/\s/g, '');

  filterBooks = (books, currentShelf) =>
    books.filter((book) => this.formatShelfName(book.shelf) === this.formatShelfName(currentShelf));

  render() {
    const { books, moveShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) => (
            <BookShelf
              shelf={shelf}
              key={this.formatShelfName(shelf)}
              books={this.filterBooks(books, shelf)}
              moveShelf={moveShelf}
            />
          ))}
        </div>

        <Link
          to='/search'
          className='open-search'
        >Add a book</Link>
      </div>
    )
  }
};

Library.proptypes = {
  books: PropTypes.array.isRequired,
  moveShelf: PropTypes.func.isRequired
};

export default Library;
