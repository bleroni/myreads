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
    books: []
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
    // check if the book is in our shelves, if not, add it
    const bookExists = books.filter(existingBook => existingBook.id === book.id)
    if (bookExists.length === 0 && newShelf !== 'none') {
      books.push(book);
    }
    // If book exists and new shelf is none, remove it from existing books
    else if (bookExists.length === 1 && newShelf === 'none') {
      books = books.filter(existingBook => existingBook.id !== book.id)
    }
    // update the change of shelf for selected book
    BooksAPI.update(book, newShelf)
      .then((resp) => {
        // Use the response from PUT /books/bookId to update current books in state, without needing to make the BooksAPI.getAll() call
        Object.keys(resp).forEach(shelfId => {
          resp[shelfId].forEach(bookId => {
            for (var i = 0; i < books.length; i++) {
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

            <Route exact path='/'></Route>
            <BookShelfHolder
              books={this.state.books}
              onChangeShelf={this.handleShelfChange}
              shelves={this.shelves}
            />
            <Route />

            />

            <Route path='/search'></Route>
            <Search
              books={this.state.books}
              onChangeShelf={this.handleShelfChange}
              shelves={this.shelves}
            />
            <Route />
            />

          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
