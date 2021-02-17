import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
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
                        {this.props.shelves.map((shelf) => {
                            return <BookShelf onChangeShelf={this.props.onChangeShelf} books={this.props.books.filter(book => book.shelf === shelf.id)} title={shelf.title} shelves={this.props.shelves} />
                        })}

                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">
                        <button>Add a book</button>
                    </Link>
                </div>
            </div>
        )
    }
}

BookShelfHolder.propTypes = {
    onChangeShelf: propTypes.func.isRequired,
}

export default BookShelfHolder;



