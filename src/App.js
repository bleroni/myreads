import React from 'react'
import BookShelf from './components/BookShelf'
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

  handleShelfChange = (bookId, newShelf) => {
    alert('changing shelf in App Component...' + bookId + ' --- ' + newShelf)
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

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
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf onChangeShelf={this.handleShelfChange} books={this.state.books.filter(book => book.shelf === 'currentlyReading')} title={'Currently Reading'} shelves={this.shelves} />
                  <BookShelf onChangeShelf={this.handleShelfChange} books={this.state.books.filter(book => book.shelf === 'wantToRead')} title={'Want to Read'} shelves={this.shelves} />
                  <BookShelf onChangeShelf={this.handleShelfChange} books={this.state.books.filter(book => book.shelf === 'read')} title={'Read'} shelves={this.shelves} />
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
