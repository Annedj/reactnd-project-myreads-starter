import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import Library from './Library'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library/>
        )}/>
        <Route exact path='/search' render={() => (
          <SearchBook/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
