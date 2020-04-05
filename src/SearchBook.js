import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import Book from './Book'
import PropTypes from 'prop-types';

class SearchBook extends Component {
  state = {
    query: '',
    searchBooks: []
  }

  updateQuery = (query) => {
    console.log('before call api ', query)

    this.setState({query})

    if (!query) { this.setState({
        searchBooks: []
      })
    } else {
      this.searchForBooks(query)
    }

  }

  searchForBooks = (query) => {
    BooksAPI.search(query)
      .then((searchBooks) => {
        this.setState({
          searchBooks
        })
    })
  }

  render() {
    const { query, searchBooks } = this.state
    const { moveShelf } = this.props
    console.log('from render ', this.state)

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
            {searchBooks.error && (<em><p>No result found for '{query}'. Please try another term.</p></em>)}

            {searchBooks.length > 0 && searchBooks.map((book) => (<Book key={book.id} book={book} moveShelf={moveShelf}/>))}

          </ol>
        </div>
      </div>
    )
  }
}

SearchBook.proptypes = {
  moveShelf: PropTypes.func.isRequired
}

export default SearchBook
