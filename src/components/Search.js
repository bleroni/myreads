import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
// var data = require('../../file.json'); 
const searchTerms = require('../SEARCH_TERMS.json');
const searchTermsLowerCase = searchTerms.map(term => term.toLowerCase())

class Search extends Component {
    state = {
        query: '',
        books: [],
        showErrorMessage: '',
        searchTermsLowerCase
    }

    searchBooks(searchTerm) {
        BooksAPI.search(searchTerm)
            .then((books) => {
                if (books.hasOwnProperty('error')) {
                    // alert('There was an error in response, empty query most likely.');
                    this.setState({ showNoResultsMessage: 'No results found.' })
                    return;
                }
                books.forEach(searchBook => {
                    this.props.books.forEach(shelfBook => {
                        if (shelfBook.id === searchBook.id) {
                            searchBook.shelf = shelfBook.shelf;
                        }
                    })
                })
                this.setState({ books })
            })
    }

    handleChange(event) {
        const currentQuery = event.target.value;
        if (this.state.searchTermsLowerCase.includes(currentQuery.toLowerCase())) {
            this.searchBooks(currentQuery);
            this.setState({ showErrorMessage: '' })
        } else if (currentQuery === '') {
            this.setState({ books: [] })
        } else {
            this.setState({ showErrorMessage: 'No results found.', books: [] })
        }

        this.setState({ query: currentQuery })

    }
    render() {


        return (
            <div className="list-books-content">
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/' className="close-search">
                            Close
                        </Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.handleChange(event)} />

                        </div>
                    </div>
                    <div className="search-books-results">

                        {this.state.showErrorMessage.length > 0 &&
                            <h3>{this.state.showErrorMessage}</h3>
                        }
                        <ol className="books-grid">
                            {this.state.books.length > 0 && this.state.books.map((book) => {
                                return (
                                    <li key={book.id}>
                                        <Book bookDetails={book} shelves={this.props.shelves} onChangeShelf={this.props.onChangeShelf} />
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
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