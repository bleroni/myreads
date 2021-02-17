import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends Component {
    state = {
        query: '',
        books: []
    }

    searchBooks(searchTerm) {
        BooksAPI.search(searchTerm)
            .then((books) => {
                // alert(JSON.stringify(books));
                this.setState({ books })

            })
    }

    handleChange(event) {
        const currentQuery = event.target.value;
        if (currentQuery.length >= 3) {
            this.searchBooks(currentQuery);
        }
        this.setState({ query: currentQuery })

    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.handleChange(event)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                    {this.state.books.map((book) => {
                        return (
                            <li key={book.id}>
                                <Book bookDetails={book} shelves={this.props.shelves} onChangeShelf={this.props.onChangeShelf} />
                            </li>
                        )
                    })}
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    onChangeShelf: propTypes.func.isRequired,
    shelves: propTypes.array.isRequired,
}


export default Search;