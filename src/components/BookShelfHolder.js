import React, { Component } from 'react';
import BookShelf from './BookShelf';

class BookShelfHolder extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf onChangeShelf={this.props.onChangeShelf} books={this.props.books.filter(book => book.shelf === 'currentlyReading')} title={'Currently Reading'} shelves={this.props.shelves} />
                        <BookShelf onChangeShelf={this.props.onChangeShelf} books={this.props.books.filter(book => book.shelf === 'wantToRead')} title={'Want to Read'} shelves={this.props.shelves} />
                        <BookShelf onChangeShelf={this.props.onChangeShelf} books={this.props.books.filter(book => book.shelf === 'read')} title={'Read'} shelves={this.shelves} />
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default BookShelfHolder;



