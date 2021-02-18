import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookShelfHolder from './components/BookShelfHolder';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.shelves = [
      { id: 'currentlyReading', title: 'Currently Reading' },
      { id: 'wantToRead', title: 'Want to Read' },
      { id: 'read', title: 'Read' }
    ];
  }
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
  }

  handleShelfChange = (book, newShelf) => {
    let books = this.state.books;
    // update the change of shelf for selected book
    BooksAPI.update(book, newShelf)
      .then((resp) => {
        // Use the response from PUT /books/bookId to update current books in state, without needing to make the BooksAPI.getAll() call
        Object.keys(resp).forEach(shelfId => {
          resp[shelfId].forEach(bookId => {
            // console.log(bookId)
            for (var i = 0; i < books.length; i++) {
              // console.log(resp[shelfId][i])
              if (books[i].id === bookId) {
                books[i].shelf = shelfId;
                return;
              }
            }
          })
        }
        )
        // update the state with the new books array 
        this.setState({ books })
      })
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>

            <Route
              exact path='/'
              render={() => (
                <BookShelfHolder
                  books={this.state.books}
                  onChangeShelf={this.handleShelfChange}
                  shelves={this.shelves}
                />
              )}
            />

            <Route
              path='/search'
              render={() => (
                <Search
                  books={this.state.books}
                  onChangeShelf={this.handleShelfChange}
                  shelves={this.shelves}
                />
              )}
            />

          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
