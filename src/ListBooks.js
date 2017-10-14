import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

const ListBooks = props => {
    let shelfCategory = ["currentlyReading", "wantToRead", "read"];
    let shelfsName = ["Currently Reading", "Want to Read", "Read", "None"];
    //後でmapする用のArray。

    const shelfList= shelfCategory.map((shelf, index) => {
            return (
               <div key={index} className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">
                                {shelfsName[index]}
                            </h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {props.bookList[shelf] !== undefined &&
                                      //そのshelfがundefinedなら以下は実行されない。
                                        props.bookList[shelf].map((book, i) => {
                                            return (
                                                <li key={i}>
                                                    <Book book={book} onChangeShelf={props.onChangeShelf} />
                                                    //Bookコンポーネントを表示。関数はシンプルに渡してあげる。
                                                </li>
                                            );
                                        })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>)
        });
    //shelfListコンポーネントはココまで。

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            {shelfList}
            <div className="open-search">
                <Link className="" to="/search">
                    Add a book
                </Link>
            </div>
        </div>
    );
};
export default ListBooks;
