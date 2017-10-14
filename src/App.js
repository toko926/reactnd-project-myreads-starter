import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import SearchBook from "./SearchBook";
import ListBooks from "./ListBooks";
var _ = require("lodash");
//https://www.npmjs.com/package/lodash

class BooksApp extends React.Component {
    state = {
        bookList: {},
        bookResultSet: [],
        bookById: [],
        searchQuery: "",
    };
    //必要なstateをarrayで定義しておく。bookListはShelfで分類、bookByIdはidで分類しておく。searchQueryはinputされた値を常に更新しsearch()にパスする。

    componentDidMount = () => {
        BooksAPI.getAll().then(books => {

            const booksByShelf = _.groupBy(books, "shelf");
            const bookById = _.groupBy(books, "id");
            this.setState({ bookList: booksByShelf, bookById: bookById });
        });
    };
    //コンポーネントがロードしたら、booksをshelfとIdで分類し新しいobjectを生成しsetStateする

    onChangeShelf = (event, book) => {
        const currentSearchQuery = this.state.searchQuery;
        BooksAPI.update(book, event.target.value).then(result => {

            BooksAPI.getAll().then(books => {
                let booksByShelf = _.groupBy(books, "shelf");
                const bookById = _.groupBy(books, "id");
                this.setState({ bookList: booksByShelf, bookById: bookById });
            });
            if (currentSearchQuery !== "") {
                BooksAPI.search(currentSearchQuery, 5).then(books => {
                    this.setState({ bookResult: books });
                });
            }
        });
    };
    //shelfが変更されたタイミングでupdateをcallし、リターンされたresultから、再度shelfとIdで分類しsetStateをcallする。

    searchBookFunc = query => {
        this.setState({ searchQuery: query });
        BooksAPI.search(query, 5).then(books => {
            this.setState({ bookResult: books });
        });
    };
    //searchする為のFunc。検索結果はbookResultとしてsetStateする。

    render() {
        const { bookList, searchQuery, bookResult, bookById } = this.state;
        //stateからES6でショートカット化

        return (
            <div className="app">
                <Route
                    path="/search"
                    render={() =>
                        <SearchBook
                            bookResultSet={bookResult}
                            bookById={bookById}
                            onChangeShelf={(event, book) => {
                                this.onChangeShelf(event, book);
                            }}
                            searchQuery={searchQuery}
                            searchBook={query => {
                                this.searchBookFunc(query);
                            }}
                        />}
                />
                //route一つ目、検索画面へ。一通りのpropsを全部渡す。functionは定義した関数を実行要件まで合わせてパスしている。

                <Route
                    exact
                    path="/"
                    render={({ history }) =>
                        <ListBooks
                            onChangeShelf={(event, book) => {
                                this.onChangeShelf(event, book);
                            }}
                            bookList={bookList}
                        />}
                />
            </div>
            //route二つ目。メインのpassで<ListBooks>コンポーネントでbookを表示している。
        );
    }
}

export default BooksApp;
