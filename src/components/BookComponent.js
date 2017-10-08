import React, { Component }  from 'react';
import ShelfChanger from './ShelfChangerComponent';

class Book extends Component {

  render(){
    let { book, shelf } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:'url({book.imageLinks.thumbnail})'}}></div>
          <div className="book-shelf-changer">
            <ShelfChanger categoryToShow={shelf} book={book}/>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book;
