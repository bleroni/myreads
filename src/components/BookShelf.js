import React, { Component } from 'react';
import propTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>

                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => {
                            return (
                                <li key={book.id}>
                                    <Book bookDetails={book} shelves={this.props.shelves} onChangeShelf={this.props.onChangeShelf} />
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

BookShelf.propTypes = {
    onChangeShelf: propTypes.func.isRequired,
}

export default BookShelf;