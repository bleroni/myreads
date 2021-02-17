import React, { Component } from 'react';
import propTypes from 'prop-types';
import SelectComponent from './SelectComponent';

class Book extends Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${this.props.bookDetails.imageLinks.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <SelectComponent onChangeShelf={this.props.onChangeShelf} shelves={this.props.shelves} bookDetails={this.props.bookDetails} />
                    </div>
                </div>
                <div className="book-title">{this.props.bookDetails.title}</div>
                <div className="book-authors">
                    {this.props.bookDetails.authors.map((author) => {
                        return `${author} `
                    })}
                </div>
            </div>
        )
    }
}

Book.propTypes = {
    bookDetails: propTypes.object.isRequired,
    onChangeShelf: propTypes.func.isRequired
}

export default Book;
