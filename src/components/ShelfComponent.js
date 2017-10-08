import React, { Component } from 'react';
import { Book } from './BookComponent';

class Shelf extends Component {

  render() {
    let { AllBooks, shelf } = this.props;
    let showingBooks = AllBooks.filter((book) =>
      book.shelf === shelf
    )

    return (
        <div className="bookshelf">
          <h1 className='bookshelf-title'>{shelf}</h1>
          <div className='bookshelf-books'>
            <ol className="books-grid">
             { showingBooks.map((book) => (
               <li key={book.industryIdentifiers[0].identifier}>
                <Book book={book} shelf={shelf}/>
               </li>
             ))}
            </ol>
          </div>
        </div>
      )
  }
}

export default Shelf
