import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

const shelves = ['Currently Reading', 'Want to Read', 'Read'];

class Library extends Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
        console.log("from app mount", books)
      })
  }

  formatShelfName = (name) => name.toLowerCase().replace(/\s/g, '')

  filterBooks = (books, currentShelf) =>
    books.filter((book) => this.formatShelfName(book.shelf) === this.formatShelfName(currentShelf))

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) => (<BookShelf shelf={shelf} key={this.formatShelfName(shelf)} books={this.filterBooks(this.state.books, shelf)} />))}
        </div>

        <Link
          to='/search'
          className='open-search'
          onClick={() => console.log('jai cliqué!')}
        >Add a book</Link>
      </div>
    )
  }
}

Library.proptypes = {
  books: PropTypes.array.isRequired
}

export default Library
