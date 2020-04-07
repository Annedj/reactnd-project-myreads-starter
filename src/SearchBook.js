import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce'

class SearchBook extends Component {
  state = {
    query: '',
    searchBooks: []
  }

  updateQuery = (query) => {
    this.setState({query, searchBooks: []})
    console.log('query is: ', this.state.query)
      if (query === '') { this.setState({
          searchBooks: []
        })
      } else {
        this.searchForBooks(query)
      }
  };

  searchForBooks = debounce((query) => {
    console.log('the api will be called')
    BooksAPI.search(query)
      .then((searchBooks) => {
        console.log('searchbooks is: ', searchBooks)
        const updatedListBooks = searchBooks ? this.updateWithExistingBooks(searchBooks) : []
        this.setState({
          searchBooks: updatedListBooks
        })
    })
  }, 100);

  updateWithExistingBooks = (searchBooks) => {
    const mergedArray = []
    if (!searchBooks.error) {
      searchBooks.forEach((searchBook) => {
        let bookToFind = this.props.books.find((existingBook) => existingBook.id === searchBook.id)
        if (bookToFind) {
          mergedArray.push(bookToFind)
        } else {
          mergedArray.push(searchBook)
        }
      })
    }
    return mergedArray
  }

  render() {
    const { query, searchBooks } = this.state
    const { moveShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
            type="text"
            onChange={(e) => this.updateQuery(e.target.value)}
            value={query}
            placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(query && searchBooks.length === 0 ) && (<em><p>No result found for '{query}'. Please try another term.</p></em>)}

            {searchBooks.length > 0 && searchBooks.map((book) => (<Book key={book.id} book={book} moveShelf={moveShelf}/>))}

          </ol>
        </div>
      </div>
    )
  }
}

SearchBook.proptypes = {
  books: PropTypes.array.isRequired,
  moveShelf: PropTypes.func.isRequired
}

export default SearchBook
