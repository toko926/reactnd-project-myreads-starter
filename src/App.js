import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './components/ShelfComponent'
import './App.css'

class App extends React.Component {
  state = {
    books:[],
    showSearchPage: false
  }

  ComponentDidMount(){
    BooksAPI.getAll.then((books) => {
      this.setState({ books })
    })
  }

  render() {
    let { books } = this.state;
    // console.log(Allbooks);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
                <Shelf shelf='currentlyReading' AllBooks={books}/>
                <Shelf shelf='wantToRead' AllBooks={books}/>
                <Shelf shelf='read' AllBooks={books}/>
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}

     </div>
    )
  }
}

export default App
