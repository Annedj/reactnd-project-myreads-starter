import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBook from './SearchBook';
import Library from './Library';

class BooksApp extends Component {
  state = {
    books: []
  };

  componentDidMount () {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
      });
  };

  updateBook = (book, newShelf) => {
    book.shelf = newShelf;
    return BooksAPI.update(book, newShelf)
  }

  moveShelf = (bookID, newShelf) => {
    let bookToUpdate = this.state.books.find((book) => book.id === bookID)

    if (bookToUpdate) {
      this.updateBook(bookToUpdate, newShelf)
        .then(books => {
          this.setState({bookToUpdate})
        })
    } else {
        BooksAPI.get(bookID).then((bookToUpdate) => {
          this.updateBook(bookToUpdate, newShelf).then(books => {
            this.setState((prevState) => ({
              books: prevState.books.concat([bookToUpdate])
            }))
          })
        })
    }
  };

  render() {
    return (
      <div className="app">
       <Route
          exact path='/'
          render={() => (<Library books={this.state.books} moveShelf={this.moveShelf} /> )}
        />
        <Route
          exact path='/search'
          render={() => (<SearchBook moveShelf={this.moveShelf} />)}
        />
      </div>
    )
  }
};

export default BooksApp;
