import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

const SearchBook = props => {
    let searchResultsToShow = [];

    //propsで受け取った検索結果から1冊ずつshelfの分類を処理する。
    if (props.bookResult.length > 0) {
        searchResultsToShow=props.bookResult.map((book, index) => {
            if(props.bookById[book.id]!==undefined){
                book.shelf=props.bookById[book.id][0].shelf;
                //bookIdが存在している=つまり既にユーザーによって分類されている場合は、そのshelfを適用する。
            } else {
              book.shelf='none';
              //分類をnoneにセット
            }

            return (
                <li key={index}>
                    <Book book={book} onChangeShelf={props.onChangeShelf} />
                </li>
                //<ol>の中で検索した結果を1冊ずつ表示する為のJSX。ここでもbookは同じコンポーネントを利用する。
            );
        });
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close Search
                </Link>

                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={props.searchQuery}
                        onChange={event => {
                            props.searchBook(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResultsToShow}
                </ol>
            </div>
        </div>
    );
};
export default SearchBook;
